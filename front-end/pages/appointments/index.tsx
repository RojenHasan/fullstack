import Head from "next/head"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useEffect, useState } from "react"
import { Appointment, Doctor, MedicalTest } from "../../types"
import MedicalTestsOverviewTable from "@/components/medicalTests/medicalTestOverviewTable"
import AppointmentService from "@/service/AppointmentService"
import AppointmentsOverviewTable from "@/components/appointments/AppointmentsOverviewTable"

const Appointment: React.FC = () => {
    const [appointments, setAppointments] = useState<Array<Appointment>>();
    const [error, setError] = useState<string>();
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [medicalTests, setMedicalTests] = useState<Array<MedicalTest>>([]);

    
    const getAppointments = async () => {
        const response = await AppointmentService.getAllAppointments();
        const appointmentss = await response.json();
        setAppointments(appointmentss);
    };

    const fetchMedicalTests = async (appointementId: number) => {
        try {
            const response = await AppointmentService.getAllMedicalTestsForAppointement(appointementId );
            if (response.ok) {
                const tests = await response.json();
                setMedicalTests(tests);
            } else {
                console.error("Error response:", response.status, response.statusText);
                setMedicalTests([]); // Set it as an empty array in case of an error
                setError("Error fetching medical tests");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setMedicalTests([]); // Set it as an empty array in case of an error
            setError("Error fetching medical tests");
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

    const handleAppointementClick = (appointment: Appointment) => {
        if (appointment.id !== undefined) {
            setSelectedAppointment(appointment);
            fetchMedicalTests(appointment.id);
        } else {
            setError("Invalid appointment ID");
        }
    };

    return (
        <>
            <Head>
                <title>Appointments</title>
            </Head>
            <Header />
            <main>
                <h1>Appointments</h1>
                <section>
                    {error && <div className="text-danger">{error}</div>}
                    {appointments && (
                        <AppointmentsOverviewTable appointments={appointments} onAppointementClick={handleAppointementClick}/>
                    )}
                    {selectedAppointment && (
                        <div>
                            <h2 className= "bottom">Medical Tests for the appointement made by doctor{selectedAppointment.doctor.name}</h2>
                            <MedicalTestsOverviewTable medicalTests={medicalTests} />
                        </div>
                    )}
                    
                </section>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Appointment;
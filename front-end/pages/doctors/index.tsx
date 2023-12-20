import Head from "next/head"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

import DoctorsOverviewTable from "@/components/doctors/DoctorsOverviewTable"
import { useEffect, useState } from "react"
import { Appointment, Doctor, MedicalTest, User } from "../../types"
import DoctorService from "@/service/DoctorService"
import MedicalTestsOverviewTable from "@/components/medicalTests/medicalTestOverviewTable"
import AppointmentsOverviewTable from "@/components/appointments/AppointmentsOverviewTable"

const Doctors: React.FC = () => {
    const [doctors, setDoctors] = useState<Array<Doctor>>();
    const [error, setError] = useState<string>();
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [appointement, setAppointements] = useState<Array<Appointment>>([]);
    const [user, setUser] = useState<User | null>(null);

    const getDoctors = async () => {
        const response = await DoctorService.getAllDoctors();
        const doctorss = await response.json();
        setDoctors(doctorss);
    };

    const fetchAppointements = async (doctorId: number) => {
        try {
            const response = await DoctorService.getAllAppointmentsForDoctor(doctorId);
            if (response.ok) {
                const tests = await response.json();
                setAppointements(tests);
            } else {
                console.error("Error response:", response.status, response.statusText);
                setAppointements([]); // Set it as an empty array in case of an error
                setError("Error fetching appointements");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setAppointements([]); // Set it as an empty array in case of an error
            setError("Error fetching appointements");
        }
    };

    useEffect(() => {
        const sessionUser = sessionStorage.getItem('user');
        getDoctors();
        if (sessionUser != null) {
            try {
                const user: User = JSON.parse(sessionUser);
                if (user != undefined) {
                    setUser(user);
                }
            } catch (error) {
                console.error("Error parsing user from session:", error);
                // Handle the error, e.g., clear the session user data
                sessionStorage.removeItem('user');
            }
        }
    }, []);

    const handleDoctorClick = (doctor: Doctor) => {
        if (doctor.id !== undefined) {
            setSelectedDoctor(doctor);
            fetchAppointements(doctor.id);
        } else {
            setError("Invalid doctor ID");
        }
    };

    return (
        <>
            <Head>
                <title>Doctors</title>
            </Head>
            <Header />
            <main>
                <h1>Doctors</h1>
                <section>
                    {error && <div className="text-danger">{error}</div>}
                    {doctors && (
                        <DoctorsOverviewTable doctors={doctors} onDoctorClick={handleDoctorClick} userRole={user?.role || null} />
                    )}
                    {selectedDoctor && (
                        <div>
                            <h2>Appointements for {selectedDoctor.name}</h2>

                            <AppointmentsOverviewTable appointments={appointement} onAppointementClick={function (appointment: Appointment): void {
                                throw new Error("Function not implemented.")
                            } } />

                        </div>
                    )}
                </section>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Doctors;
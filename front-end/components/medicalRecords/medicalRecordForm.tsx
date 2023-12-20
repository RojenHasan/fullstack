import React, { useEffect, useState } from 'react';
import { Doctor, Patient, StatusMessage, User } from '@/types';
import DoctorService from '@/service/DoctorService';
import { useRouter } from 'next/router';
import pages from '@/pages';
import { title } from 'process';
import { Form, Button } from 'react-bootstrap';
import StatusMessageParser from '../StatusMessageParser';
import UserService from '@/service/UserService';
import PatientService from '@/service/PatientService';
import MedicalRecordService from '@/service/MedicalRecordService';
import AppointmentService from '@/service/AppointmentService';

const MedicalRecordForm: React.FC = () => {
    const router = useRouter()

    const [diagnosis, setDiagnosis] = useState("")
    const [treatment, setTreatment] = useState("")
    const [date, setDate] = useState("")
    const [patientId, setPatientId] = useState<number | undefined>(undefined);
    const [doctorId, setDoctorId] = useState<number | undefined>(undefined);


    const [diagnosisError, setDiagnosisError] = useState("")
    const [treatmentError, setTreatmentError] = useState("")
    const [dateError, setDateError] = useState("")
    const [patientIdError, setPatientIdError] = useState("")
    const [doctorIdError, setDoctorIdError] = useState("")

    const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

    const [patients, setPatients] = useState<Array<Patient>>()
    const [doctors, setDoctors] = useState<Array<Doctor>>()
    useEffect(() => {
        // Fetch the list of users and set it in the state
        const fetchDoctors = async () => {
            try {
                const response = await DoctorService.getAllDoctors();
                const data = await response.json();
                if (response.status === 200) {
                    setDoctors(data);
                } else {
                    console.error("Error fetching data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const fetchPatients = async () => {
            try {
                const response = await PatientService.getAllPatients();
                const data = await response.json();
                if (response.status === 200) {
                    setPatients(data);
                } else {
                    console.error("Error fetching data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDoctors();
        fetchPatients();
    }, []);

    const validate = (): boolean => {
        let isValid = true

        setDateError("")
        setDiagnosisError("")
        setTreatmentError("")
        setPatientIdError("")
        setDoctorIdError("")

        setStatusMessage(null)

        if (!treatment && treatment.trim() === "") {
            setTreatmentError("treatment can't be empty")
            isValid = false
        }
        if (!diagnosis && diagnosis.trim() === "") {
            setDiagnosisError("diagnosis can't be empty")
            isValid = false
        }
        if (!patientId) {
            setPatientIdError("Choose a patient")
            isValid = false
        }
        if (!doctorId) {
            setDoctorIdError("Choose a doctor")
            isValid = false
        }


        return isValid
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        if (!validate()) {
            return
        }

        try {
            // Add the medical record
            const response = await MedicalRecordService.addMedicalRecord({
                diagnosis,
                treatment,
                date: date ? new Date(date) : new Date(),
                patient: { id: Number(patientId) },
                doctor: { id: Number(doctorId) },
            });

            if (response.ok) {
                // Get the ID of the added medical record
                const data = await response.json();
                const medicalRecordId = data.id;

                // Get the appointment ID from the router query
                const { appointmentId } = router.query;

                // Check if the appointment ID is available in the query
                if (appointmentId) {
                    // Connect the medical record to the appointment
                    await AppointmentService.addMedicalRecordToAppointment(
                        Number(appointmentId),
                        medicalRecordId
                    );
                }

                // Redirect to the appointments page or handle as needed
                router.push("/appointments");
            } else {
                // Handle error response from adding medical record
                const data = await response.json();
                setStatusMessage({
                    type: "error",
                    message: data.errorMessage,
                });
            }
        } catch (error) {
            console.error("Error adding medical record:", error);
            setStatusMessage({
                type: "error",
                message: "An unexpected error occurred.",
            });
        }
    };

    return (
        <>
            {statusMessage !== null && (
                <StatusMessageParser statusMessage={statusMessage} />
            )}
            <Form onSubmit={handleSubmit} style={{ marginBottom: '10rem' }}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="">Diagnosis</Form.Label>
                    <Form.Control id="diagnosis" type="text" value={diagnosis} onChange={(event) => { setDiagnosis(event.target.value) }} />
                    <Form.Text className="text-muted">
                        {diagnosisError && <div className="text-danger">{diagnosisError}</div>}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="">Treatment</Form.Label>
                    <Form.Control id="treatment" type="text" value={treatment} onChange={(event) => { setTreatment(event.target.value) }} />
                    <Form.Text className="text-muted">
                        {treatmentError && <div className="text-danger">{treatmentError}</div>}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="date">Date</Form.Label>
                    <Form.Control
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        {dateError && <div className="text-danger">{dateError}</div>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="selectPatient">Patient</Form.Label>
                    <Form.Select
                        defaultValue={'DEFAULT'}
                        id="selectPatient"
                        onChange={(event) => {
                            setPatientId(Number(event.target.value));
                        }}
                    >
                        <option value="DEFAULT" disabled>
                            Choose existing Patient ...
                        </option>
                        {patients &&
                            patients.map((patient) => (
                                <option key={patient.id} value={patient.id}>
                                    {patient.user.email}
                                </option>
                            ))}
                    </Form.Select>

                    <Form.Text>
                        {patientIdError && <div className="text-danger">{patientIdError}</div>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="selectDoctor">Doctor</Form.Label>
                    <Form.Select
                        defaultValue={'DEFAULT'}
                        id="selectDoctor"
                        onChange={(event) => {
                            setDoctorId(Number(event.target.value));
                        }}
                    >
                        <option value="DEFAULT" disabled>Choose an existing doctor ...</option>
                        {doctors && doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.user.email}
                            </option>
                        ))}
                    </Form.Select>

                    <Form.Text>
                        {doctorIdError && <div className="text-danger">{doctorIdError}</div>}
                    </Form.Text>
                </Form.Group>
                <Button
                    variant="outline-primary"
                    type="submit">
                    Add
                </Button>
            </Form>
        </>
    )
}
export default MedicalRecordForm;

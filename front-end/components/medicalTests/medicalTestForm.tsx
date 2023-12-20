import React, { useEffect, useState } from 'react';
import { Doctor, Patient, StatusMessage } from '@/types';
import DoctorService from '@/service/DoctorService';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import StatusMessageParser from '../StatusMessageParser';
import PatientService from '@/service/PatientService';
import AppointmentService from '@/service/AppointmentService';
import MedicalTestService from '@/service/MedicalTestService';

interface MedicalTestFormProps {
    appointmentId?: string | number;
}

const MedicalTestForm: React.FC<MedicalTestFormProps> = ({ appointmentId }) => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [cost, setCost] = useState("");
    const [description, setDescription] = useState("");
    const [patientId, setPatientId] = useState<number | undefined>(undefined);
    const [doctorId, setDoctorId] = useState<number | undefined>(undefined);

    const [nameError, setNameError] = useState("");
    const [costError, setCostError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [patientIdError, setPatientIdError] = useState("");
    const [doctorIdError, setDoctorIdError] = useState("");

    const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

    const [patients, setPatients] = useState<Array<Patient>>();
    const [doctors, setDoctors] = useState<Array<Doctor>>();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await DoctorService.getAllDoctors();
                const data = await response.json();
                if (response.status === 200) {
                    setDoctors(data);
                } else {
                    console.error("Error fetching doctors");
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        const fetchPatients = async () => {
            try {
                const response = await PatientService.getAllPatients();
                const data = await response.json();
                if (response.status === 200) {
                    setPatients(data);
                } else {
                    console.error("Error fetching patients");
                }
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        fetchDoctors();
        fetchPatients();
    }, []);

    const validate = (): boolean => {
        let isValid = true;

        setDescriptionError("");
        setNameError("");
        setCostError("");
        setPatientIdError("");
        setDoctorIdError("");

        setStatusMessage(null);

        if (!name.trim()) {
            setNameError("Name can't be empty");
            isValid = false;
        }
        if (!description.trim()) {
            setDescriptionError("Description can't be empty");
            isValid = false;
        }
        if (!patientId) {
            setPatientIdError("Choose a patient");
            isValid = false;
        }
        if (!doctorId) {
            setDoctorIdError("Choose a doctor");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }

        try {
            const response = await MedicalTestService.addMedicalTest({
                name,
                cost: Number(cost),
                description,
                doctor: { id: Number(doctorId) },
                patient: { id: Number(patientId) },
            });

            if (response.ok) {
                const data = await response.json();
                const medicalTestId = data.id;

                if (appointmentId) {
                    await AppointmentService.addMedicalTestToAppointment(
                        Number(appointmentId),
                        medicalTestId
                    );
                }

                console.log("jqb5555555555", appointmentId)
                router.push("/appointments");
            } else {
                const data = await response.json();
                setStatusMessage({
                    type: "error",
                    message: data.errorMessage,
                });
            }
        } catch (error) {
            console.error("Error adding medical test:", error);
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
                    <Form.Label htmlFor="">Name</Form.Label>
                    <Form.Control id="name" type="text" value={name} onChange={(event) => { setName(event.target.value) }} />
                    <Form.Text className="text-muted">
                        {nameError && <div className="text-danger">{nameError}</div>}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="">Description</Form.Label>
                    <Form.Control id="description" type="text" value={description} onChange={(event) => { setDescription(event.target.value) }} />
                    <Form.Text className="text-muted">
                        {descriptionError && <div className="text-danger">{descriptionError}</div>}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="">Cost</Form.Label>
                    <Form.Control id="cost" type="number" value={cost} onChange={(event) => { setCost(event.target.value) }} />
                    <Form.Text className="text-muted">
                        {costError && <div className="text-danger">{costError}</div>}
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
                <Button variant="outline-primary" type="submit">
                    Add
                </Button>
            </Form>
        </>
    )
}
export default MedicalTestForm;

import React, { useEffect, useState } from 'react';
import { Doctor, Patient, StatusMessage, User, Appointment } from '@/types';
import DoctorService from '@/service/DoctorService';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import StatusMessageParser from '../StatusMessageParser';
import UserService from '@/service/UserService';
import PatientService from '@/service/PatientService';
import AppointmentService from '@/service/AppointmentService';

const AppointmentForm: React.FC = () => {
  const router = useRouter();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patientId, setPatientId] = useState<number | undefined>(undefined);
  const [doctorId, setDoctorId] = useState<number | undefined>(undefined);
  const [userId, setUserId] = useState<number | undefined>(undefined);

  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [patientError, setPatientError] = useState("");
  const [doctorError, setDoctorError] = useState("");
  const [userError, setUserError] = useState("");

  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

  const [users, setUsers] = useState<Array<User>>([]);
  const [patients, setPatients] = useState<Array<Patient>>([]);
  const [doctors, setDoctors] = useState<Array<Doctor>>([]);

  const getPatients = async () => {
    PatientService.getAllPatients().
      then((res) => res.json()).
      then(((patients) => setPatients(patients)))
  }

  const getDoctors = async () => {
    DoctorService.getAllDoctors().
      then((res) => res.json()).
      then(((doctors) => setDoctors(doctors)))
  }

  useEffect(() => {
    getDoctors();
    getPatients();
  }, []);

  const validate = (): boolean => {
    let isValid = true;

    setDateError("");
    setTimeError("");
    setPatientError("");
    setDoctorError("");
    setUserError("");

    setStatusMessage(null);

    if (!date.trim()) {
      setDateError("Date can't be empty");
      isValid = false;
    }
    if (!time.trim()) {
      setTimeError("Time can't be empty");
      isValid = false;
    }
    if (!doctorId) {
      setDoctorError("Doctor must be selected");
      isValid = false;
    }
    if (!patientId) {
      setPatientError("Patient must be selected");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log('handleSubmit called');

    if (!validate()) {
      return;
    }

    const appointment = {
      date: date ? new Date(date) : new Date(),
      time: time ? new Date(`1970-01-01T${time}:00.000Z`) : new Date(),
      doctor: { id: Number(doctorId) },
      patient: { id: Number(patientId) },
    }

    const response = await AppointmentService.addAppointment(appointment)

    const data = await response.json()
    if (response.status === 200) {
      setStatusMessage({
        type: "success",
        message: "Successfully added"
      })
      setTimeout(() => {
        router.push("/doctors")
      }, 2000)

    } else if (response.status === 401) {
      setStatusMessage({
        type: "unauthorized",
        message: data.errorMessage
      })
    } else {
      setStatusMessage({
        type: "error",
        message: data.errorMessage
      })
    }
  }


  return (
    <>
      {statusMessage !== null && (
        <StatusMessageParser statusMessage={statusMessage} />
      )}
      <Form onSubmit={handleSubmit} style={{ marginBottom: '10rem' }}>
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
          <Form.Label htmlFor="time">Time</Form.Label>
          <Form.Control
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <Form.Text className="text-muted">
            {timeError && <div className="text-danger">{timeError}</div>}
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
            {patientError && <div className="text-danger">{patientError}</div>}
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
            {doctorError && <div className="text-danger">{doctorError}</div>}
          </Form.Text>
        </Form.Group>
        <Button
          variant="outline-primary"
          type="submit">
          Add
        </Button>
      </Form>
    </>
  );
};

export default AppointmentForm;
import appointmentDb from "../domain/data-access/appointment.db";
import doctorDb from "../domain/data-access/doctor.db";
import patientDb from "../domain/data-access/patient.db";
import { Appointment } from "../domain/model/appointment";
import { MedicalTest } from "../domain/model/medicalTest";
import { AppointmentInput, DoctorInput, MedicalRecordInput, MedicalTestInput, PatientInput } from "../types/types";
import doctorService from "./doctor.service";
import medicalTestService from "./medicalTest.service";
import patientService from "./patient.service";


const getAllAppointments = async (): Promise<Appointment[]> =>
  appointmentDb.getAllAppointments();

const getAppointmentById = async (id: number): Promise<Appointment> => {
  const appointment = await appointmentDb.getAppointmentById(id);
  return appointment;
}

const addAppointment = async (appointmentInput: AppointmentInput): Promise<Appointment> => {
    Appointment.validate(appointmentInput)
    // Check if patient is provided
    if (!appointmentInput.patient || !appointmentInput.patient.id) {
      throw new Error("Patient ID is missing.");
  }

  // Check if doctor is provided
  if (!appointmentInput.doctor || !appointmentInput.doctor.id) {
      throw new Error("Doctor ID is missing.");
  }
  

  // Check if patient exists
  const existingPatient = await patientDb.getPatientById(appointmentInput.patient.id);
  if (!existingPatient) {
      throw new Error(`Patient with ID ${appointmentInput.patient.id} does not exist.`);
  }

  // Check if doctor exists
  const existingDoctor = await doctorDb.getDoctorByIdId(appointmentInput.doctor.id);
  if (!existingDoctor) {
      throw new Error(`Doctor with ID ${appointmentInput.doctor.id} does not exist.`);
  }

    const newAppointment = await appointmentDb.addAppointment(appointmentInput);
    return newAppointment;
   
};
const addMedicalTestsToAppointment = async ({
  appointment,
  medicalTests
}: {
  appointment: AppointmentInput;
  medicalTests: MedicalTestInput[];
}): Promise<Appointment> => {
  if (!appointment.id) throw new Error('Appointment id is required');
  if (!medicalTests.length) throw new Error('At least one medicalTest is required');
  if (!appointmentDb.getAppointmentById(appointment.id)) throw new Error('Appointment not found');

  return appointmentDb.addMedicalTestsToAppointment({ appointment, medicalTests });
};

const addMedicalRecordToAppointment = async ({
  appointmentId,
  medicalRecordId
}: {
  appointmentId: number;
  medicalRecordId
  : number;
}): Promise<Appointment> => {
  if (!appointmentId) throw new Error('Appointment id is required');
  if (!  medicalRecordId
    || !  medicalRecordId
    ) throw new Error('Medical record is required');

  // Check if the appointment exists
  const existingAppointment = await appointmentDb.getAppointmentById(appointmentId);
  if (!existingAppointment) {
    throw new Error('Appointment not found');
  }

  // Connect the existing medical record to the appointment
  return appointmentDb.addMedicalRecordToAppointment({ appointmentId, medicalRecordId });
};


const handleAppointmentInput = async (
  date: Date,
  time: Date,
  patient: PatientInput,
  doctor: DoctorInput,
  medicalRecord: MedicalRecordInput,
  medicalTests: MedicalTestInput[]
) => {
  if (!doctor.id) {
    throw new Error("doctor Id can't be empty.");
  }

  if (!patient.id) {
    throw new Error("patientId can't be empty.");
  }
  if (!medicalRecord.id) {
    throw new Error("medicalRecordId can't be empty.");
  }

  if (!medicalTests || medicalTests.length === 0) {
    throw new Error("medicalTest can't be empty.");
  }

  // Check if patient exists
  await patientService.getPatientById(patient.id);

  // Check if doctor exists
  await doctorService.getDoctorById(doctor.id);

  // Check if date is a valid date
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date.");
  }

  // Check if time is a valid time
  if (isNaN(time.getTime())) {
    throw new Error("Invalid time.");
  }
};

const getAllMedicalTestForAppointment = async (appointmentId: number): Promise<MedicalTest[]> => {
  try {
      const result = await appointmentDb.getAllMedicalTestForAppointment(appointmentId);
      // Assuming MedicalTest type has properties id, name, cost, description, patientId, and doctorId
      return result as unknown as MedicalTest[];
  } catch (error) {
      console.error(error);
      throw new Error('Database error. See server log for details.');
  }
};


export default { getAllMedicalTestForAppointment,addMedicalRecordToAppointment, addMedicalTestsToAppointment, getAllAppointments, getAppointmentById, addAppointment };

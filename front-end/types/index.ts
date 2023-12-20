export interface LoginUser {
  name: string
  password: string
}

export interface User {
  id?: number
  password: String
  role: string
  email: String
}
export interface StatusMessage {
  type: String
  message: String
}
export interface Doctor {
  id: number;
  name: String;
  experience: String;
  availability: String;
  user: User;
}

export interface Patient {
  id?: number;
  name: String;
  user: User;
  medical_History: String;
  street: String;
  postcode: number;
  housenr: number;
  stad: String;
}
export interface MedicalTest {
  id?: number;
  name: String
  cost: number
  description: String
  patientId: Patient
  doctorId: Doctor
}
export interface Appointment {
  id?: number
  date: Date
  time: Date
  doctor: number | Doctor;
  patient: number | Patient;
  medicalRecord?: MedicalRecord
}
export interface MedicalRecord {
  id?: number;
  diagnosis: string;
  treatment: string
  date: Date
  patientId: Patient
  doctorId: Doctor
}
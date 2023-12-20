import { Doctor } from "./doctor";
import { Patient } from "./patient";
import { MedicalRecord } from "./medicalRecord";
import { MedicalTest } from "./medicalTest";
import {
    MedicalTest as MedicalTestPrisma,
    Patient as PatientPrisma,
    Doctor as DoctorPrisma,
    User as UserPrisma,
    MedicalRecord as MedicalRecordPrisma,
    Appointment as AppointmentPrisma
} from '@prisma/client';

export class Appointment {
    id: number
    date: Date
    time: Date
    doctor: Doctor
    patient: Patient
    medicalRecord: MedicalRecord
    medicalTests: MedicalTest[]


    constructor(appointment: {
        id: number, date: Date,
        time: Date, patient: Patient, doctor: Doctor,
        medicalRecord: MedicalRecord,
        medicalTests: MedicalTest[]
    }) {
        this.id = appointment.id;
        this.date = appointment.date;
        this.time = appointment.time;
        this.medicalRecord = appointment.medicalRecord;
        this.medicalTests = appointment.medicalTests;
        this.patient = appointment.patient;
        this.doctor = appointment.doctor;

    }
    static validate(appointment: { date?: Date, time?: Date }) {
        if (!appointment.date) {
            throw new Error('Date is required');
        }
        if (!appointment.time) {
            throw new Error('Time is required');
        }
        const currentDateTime = new Date();
        const appointmentDateTime = new Date(appointment.date);

        // Compare both date and time
        if (
            appointmentDateTime.getTime() < currentDateTime.getTime() ||
            (appointmentDateTime.getTime() === currentDateTime.getTime() && appointment.time < currentDateTime)
        ) {
            throw new Error('Appointment must be scheduled in the future');
        }
    }
    static create(
        id: number,
        date: Date,
        time: Date,
        doctor: Doctor,
        patient: Patient,
        medicalRecord: MedicalRecord,
        medicalTests: MedicalTest[]
    ) {
        return new Appointment({
            id: id,
            date: date,
            time: time,
            medicalRecord: medicalRecord,
            medicalTests: medicalTests,
            doctor: doctor,
            patient: patient
        });
    }
    equals({ date, time, doctor, patient, medicalRecord }): boolean {
        return (
            this.date === date &&
            this.time === time &&
            this.doctor === doctor &&
            this.patient === patient &&
            this.medicalRecord === medicalRecord
        );
    }
    addMedicalTestToAppointment(medicalTest: MedicalTest) {
        this.medicalTests.push(medicalTest)
    }


    static from({
        id,
        date,
        time,
        doctor,
        patient,
        medicalRecord,
        medicalTests
    }: AppointmentPrisma & {
        doctor: DoctorPrisma & { user: UserPrisma },
        patient: PatientPrisma & { user: UserPrisma },
        medicalRecord?: MedicalRecordPrisma & {
            doctor: DoctorPrisma & { user: UserPrisma },
            patient: PatientPrisma & { user: UserPrisma }
        },
        medicalTests: (MedicalTestPrisma & {
            doctor: DoctorPrisma & { user: UserPrisma },
            patient: PatientPrisma & { user: UserPrisma }
        })[];
    }) {
        return new Appointment({
            id,
            date,
            time,
            doctor: Doctor.from(doctor),
            patient: Patient.from(patient),
            medicalRecord: medicalRecord ? MedicalRecord.from(medicalRecord) : null,
            medicalTests: medicalTests ? medicalTests.map((medicalTest) =>
                MedicalTest.from(medicalTest)) : [],
        });
    }
    
}


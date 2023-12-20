import { Doctor } from "./doctor";
import { Patient } from "./patient";
import {
    MedicalRecord as MedicalRecordPrisma,
    Patient as PatientPrisma,
    Doctor as DoctorPrisma,
    User as UserPrisma
} from '@prisma/client';

export class MedicalRecord {
    readonly id: number;
    readonly diagnosis: string;
    readonly treatment: string
    readonly date: Date
    readonly patient: Patient
    readonly doctor: Doctor

    constructor (medicalRecord : {id:number, diagnosis:string, 
        treatment:string, date:Date, patient:Patient, doctor: Doctor}){
        this.id  = medicalRecord.id;
        this.diagnosis = medicalRecord.diagnosis;
        this.treatment = medicalRecord.treatment;
        this.date = medicalRecord.date
        this.patient = medicalRecord.patient
        this.doctor = medicalRecord.doctor
    }

    static validate(medicalRecord: {diagnosis?: string,treatment?: string, date?: Date }){
        if(!medicalRecord.date){
            throw new Error('Date is required');
        }
        if(!medicalRecord.diagnosis){
            throw new Error('diagnosis is required');
        }
        if(!medicalRecord.treatment){
            throw new Error('treatment is required');
        }
    }

    static create(id:number, diagnosis:string, treatment:string, 
        date:Date, patient:Patient, doctor: Doctor){
        return new MedicalRecord( {id:id, diagnosis:diagnosis, treatment:treatment,
            date:date, patient:patient, doctor: doctor})
    }
    static from({
        id,
        diagnosis,
        treatment,
        date,
        patient,
        doctor,
    }: MedicalRecordPrisma & { 
        patient: PatientPrisma  & { user: UserPrisma };
        doctor: DoctorPrisma  & { user: UserPrisma }
    }) {
        return new MedicalRecord({
            id,
            diagnosis,
            treatment,
            date,
            patient : Patient.from(patient),
            doctor: Doctor.from(doctor),
        });
    }
}
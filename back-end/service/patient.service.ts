import { Prisma } from "@prisma/client";
import patientDb from "../domain/data-access/patient.db"
import { Patient } from "../domain/model/patient"
import { User } from "../domain/model/user";
import { PatientInput } from "../types/types";
import { database } from "../util/db.server";
import userDb from "../domain/data-access/user.db";

const getAllPatients = async (): Promise<Patient[]> => {
    return await patientDb.getAllPatients();
}
const getPatientById = async (id: number): Promise<Patient> => {
    
    const patient = await patientDb.getPatientById(id); // Pass id as a number, not an object
    return patient;
};

const addPatient = async (patient: PatientInput): Promise<Patient> => {
    Patient.validate(patient)
    if (!patient.user || !patient.user.email) {
        throw new Error("User email is missing.");
    }
    const existingPatientWithUser = await patientDb.getPatientByUserEmail(patient.user.email);
    if (existingPatientWithUser) {
        throw new Error("User with this email is already associated with a patient.");
    }
    const newPatient = await patientDb.addPatient(patient)
    return newPatient

};

const updatePatient = async (patient: PatientInput): Promise<Patient> => {
    Patient.validate(patient)
    try {
        if (!patient.user || !patient.user.email) {
            throw new Error("User email is missing.");
        }
        const existingPatient = await patientDb.getPatientById(patient.id);
        if (existingPatient && existingPatient.user?.email !== patient.user?.email) {
            const patientWithNewEmail = await patientDb.getPatientByUserEmail(patient.user?.email || '');
            if (patientWithNewEmail) {
                throw new Error("User with this email is already associated with a patient.");
            }
        }
        return patientDb.updatePatient(patient)
    } catch (error) {
        throw new Error(error.message);
    }
}


const deletePatient = async (id: number) => {
    await getPatientById(id);
    return await patientDb.deletePatientById(id);

};
export default { getAllPatients, getPatientById, addPatient, updatePatient, deletePatient }
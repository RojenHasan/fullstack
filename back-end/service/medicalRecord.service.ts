import doctorDb from "../domain/data-access/doctor.db";
import medicalRecordDb from "../domain/data-access/medicalRecord.db";
import patientDb from "../domain/data-access/patient.db";
import { Doctor } from "../domain/model/doctor";
import { MedicalRecord } from "../domain/model/medicalRecord";
import { Patient } from "../domain/model/patient";
import { DoctorInput, MedicalRecordInput, PatientInput } from "../types/types";

const getAllMedicalRecords = async (): Promise<MedicalRecord[]> =>
    medicalRecordDb.getAllMedicalRecords();

const getMedicalRecordById = async (id: number): Promise<MedicalRecord> => {
    const medicalRecord = await medicalRecordDb.getMedicalRecordById(id);
    return medicalRecord;
}

const getAllMedicalRecordsByPatientId = async (patientId: number): Promise<MedicalRecord[]> => {

    return medicalRecordDb.getAllMedicalRecordsByPatientId(patientId);
};
const addMedicalRecord = async (medicalRecord: MedicalRecordInput): Promise<MedicalRecord> => {
    try {
        MedicalRecord.validate(medicalRecord);

        // Check if patient is provided
        if (!medicalRecord.patient || !medicalRecord.patient.id) {
            throw new Error("Patient ID is missing.");
        }

        // Check if doctor is provided
        if (!medicalRecord.doctor || !medicalRecord.doctor.id) {
            throw new Error("Doctor ID is missing.");
        }

        // Check if patient exists
        const existingPatient = await patientDb.getPatientById(medicalRecord.patient.id);
        if (!existingPatient) {
            throw new Error(`Patient with ID ${medicalRecord.patient.id} does not exist.`);
        }

        // Check if doctor exists
        const existingDoctor = await doctorDb.getDoctorByIdId(medicalRecord.doctor.id);
        if (!existingDoctor) {
            throw new Error(`Doctor with ID ${medicalRecord.doctor.id} does not exist.`);
        }

        // Add medical record
        const newMedicalRecord = await medicalRecordDb.addMedicalRecord(medicalRecord);
        return newMedicalRecord;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to create the medical record: ${error.message}`);
    }
};



/*
const addPatientToMedicalRecord = async ({
    medicalRecord,
    patient,
}: {
    medicalRecord: MedicalRecordInput;
    patient: PatientInput;
}): Promise<MedicalRecord> => {
    if (!medicalRecord.id) throw new Error('medicalRecord id is required');
    if (!medicalRecordDb.getMedicalRecordById(medicalRecord.id)) throw new Error('medicalRecord not found');

    return medicalRecordDb.addPatientToMedicalRecord({ medicalRecord, patient })
}
*/

export default { getAllMedicalRecords, getMedicalRecordById, addMedicalRecord, getAllMedicalRecordsByPatientId }
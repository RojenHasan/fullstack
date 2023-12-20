import doctorDb from '../domain/data-access/doctor.db';
import medicalRecordDb from '../domain/data-access/medicalRecord.db';
import medicalTestDb from '../domain/data-access/medicalTest.db';
import patientDb from '../domain/data-access/patient.db';
import { MedicalTest } from '../domain/model/medicalTest';
import { MedicalTestInput } from '../types/types';

const getAllMedicalTests = async (): Promise<MedicalTest[]> => {
  return medicalTestDb.getAllMedicalTests();
};

const getMedicalTestById = async (id: number): Promise<MedicalTest> => {
    const medicalTest = await medicalTestDb.getMedicalTestById(id);
    return medicalTest;
};

const addMedicalTest = async (medicalTest: MedicalTestInput): Promise<MedicalTest> => {
  
  try {
    MedicalTest.validate(medicalTest);

    // Check if patient is provided
    if (!medicalTest.patient || !medicalTest.patient.id) {
        throw new Error("Patient ID is missing.");
    }

    // Check if doctor is provided
    if (!medicalTest.doctor || !medicalTest.doctor.id) {
        throw new Error("Doctor ID is missing.");
    }

    // Check if patient exists
    const existingPatient = await patientDb.getPatientById(medicalTest.patient.id);
    if (!existingPatient) {
        throw new Error(`Patient with ID ${medicalTest.patient.id} does not exist.`);
    }

    // Check if doctor exists
    const existingDoctor = await doctorDb.getDoctorByIdId(medicalTest.doctor.id);
    if (!existingDoctor) {
        throw new Error(`Doctor with ID ${medicalTest.doctor.id} does not exist.`);
    }

    const newMedicalTest = await medicalTestDb.addMedicalTest(medicalTest);
    return newMedicalTest;
} catch (error) {
    console.error(error);
    throw new Error(`Failed to create the medical record: ${error.message}`);
}

};

export default {
  getAllMedicalTests,
  getMedicalTestById,
  addMedicalTest,
};

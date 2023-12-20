import { Prisma } from "@prisma/client";
import { database } from "../../util/db.server";
import { Patient } from "../model/patient";
//import { User } from "../model/user";
import { PatientInput } from "../../types/types";
import { User } from "../model/user";


const getAllPatients = async (): Promise<Patient[]> => {
    try {
        const patientsPrisma = await database.patient.findMany({
            include: { user: true }
        });
        return patientsPrisma.map((patientPrisma) =>
            Patient.from(patientPrisma as any))
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getPatientById = async (id: number):
    Promise<Patient | null> => {
    try {
        const patientPrisma = await database.patient.findUnique({
            where: { id: id },
            include: { user: true },
        });
        return Patient.from(patientPrisma as any);
    } catch (error) {
        throw new Error(`Patient with id {${id}} couldn't be found`);
    }
};


const addPatient = async ({
    name,
    user,
    medical_History,
    street,
    postcode,
    housenr,
    stad,
}: PatientInput): Promise<Patient> => {
    try {
        const patientPrisma = await database.patient.create({
            data: {
                name,
                medical_History,
                street,
                postcode,
                housenr,
                stad,
                user: user.email
                    ? {
                        connect: {
                            email: user.email,
                        },
                    }
                    : undefined,
            },
            include: { user: true },
        });
        return Patient.from(patientPrisma as any);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error(`Error by creating a patient`);
            }
        }
        throw new Error(error.message);
    }
};


const deletePatientById = async (id: number): Promise<Patient> => {
    const deletedPatient = await database.patient.delete({
        where: {
            id: id,
        },include : {
            user: true
        }
    });
    return deletedPatient;
};
/*
const deletePatient = async (id: number): Promise<void> => {
    try {
        const patientPrisma = await database.patient.findUnique({
            where: { id },
        });

        if (!patientPrisma) {
            throw new Error(`Patient with id ${id} not found`);
        }

        // Delete the patient using Prisma
        await database.patient.delete({
            where: { id },
        });
    } catch (error) {
        throw new Error(`Failed to delete patient: ${error.message}`);
    }
};
*/
const updatePatient = async ({
    id,
    name,
    medical_History,
    street,
    postcode,
    housenr,
    stad,
    user
}:PatientInput): Promise<Patient> => {
    try {
        const updatedPatient = await database.patient.update({
            where: { id: id },
            data: {
                name: name,
                medical_History: medical_History,
                street: street,
                postcode: postcode,
                housenr: housenr,
                stad: stad,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            },
            include: { user: true }, // Use the correct Prisma generated User type
        });

        return Patient.from(updatedPatient as any);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2016') {
                throw new Error(`Patient with ID ${id} not found.`);
            }
        }
    }
};
const getPatientByUserEmail = async (email: string): Promise<Patient | null> => {
    try {
        const patientPrisma = await database.patient.findFirst({
            where: {
                user: {
                    email: email,
                },
            },
            include: { user: true },
        });
        return patientPrisma ? Patient.from(patientPrisma as any) : null;
    } catch (error) {
        throw new Error(`Error fetching patient by user email ${email}: ${error.message}`);
    }
};
const getPatientByName = async (name: string): Promise<Patient | null> => {
    try {
        const patientPrisma = await database.patient.findFirst({
            where: {
                name: name,
            },
            include: { user: true },
        });
        return patientPrisma ? Patient.from(patientPrisma as any) : null;
    } catch (error) {
        throw new Error(`Error fetching patient by name ${name}: ${error.message}`);
    }
};
export default {deletePatientById, getPatientByName, getAllPatients, updatePatient, getPatientById, addPatient , getPatientByUserEmail}
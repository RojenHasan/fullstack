
import { Prisma } from "@prisma/client";
import { AppointmentInput, DoctorInput } from "../../types/types";
import { database } from "../../util/db.server";
import { Doctor } from "../model/doctor";
import { User } from "../model/user";


const getAllDoctors = async (): Promise<Doctor[]> => {
    try {
        const doctorsPrisma = await database.doctor.findMany({
            include: { user: true }
        });
        return doctorsPrisma.map((doctorPrisma) =>
            Doctor.from(doctorPrisma as any))
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}


const updateDoctor = async ({
    id,
    name,
    user,
    experience,
    availability,
}: DoctorInput): Promise<Doctor> => {
    try {
        const updatedDoctor = await database.doctor.update({
            where: { id: id },
            data: {
                name: name,
                experience: experience,
                availability: availability,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            },
            include: { user: true },
        });
        return Doctor.from(updatedDoctor);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2016') {
                throw new Error(`Doctor with ID ${id} not found.`);
            }
        }
    }
};
const addDoctor = async ({
    name,
    user,
    experience,
    availability,
}: DoctorInput): Promise<Doctor> => {
    try {
        const doctorPrisma = await database.doctor.create({
            data: {
                name,
                experience,
                availability,
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

        return Doctor.from(doctorPrisma as any);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error(`Error by creating a doctor`);
            }
        }
        throw new Error(error.message);
    }
};

const deleteDoctorById = async (id: number): Promise<Doctor> => {
    const deletedDoctor = await database.doctor.delete({
        where: {
            id: id,
        },include : {
            user: true
        }
    });
    return deletedDoctor;
};
/*
const deleteDoctor = async ({ id }: { id: number }): Promise<void> => {
    try {
        const doctorPrisma = await database.doctor.findUnique({
            where: { id },
        });

        if (!doctorPrisma) {
            throw new Error(`Doctor with id ${id} not found`);
        }
        await database.doctor.delete({
            where: { id },
        });
    } catch (error) {
        throw new Error(`Failed to delete doctor: ${error.message}`);
    }
};*/

const getAllMedicalTestsByDoctor = async (doctorId: number) => {
    try {
        const medicalTestsPrisma = await database.medicalTest.findMany({
            where: { doctorId: doctorId },
            include: {
                patient: true,
                doctor: true,
            },
        });

        return medicalTestsPrisma.map((medicalTestPrisma) => {
            return {
                id: medicalTestPrisma.id,
                name: medicalTestPrisma.name,
                cost: medicalTestPrisma.cost,
                description: medicalTestPrisma.description,
                patient: {
                    id: medicalTestPrisma.patient.id,
                    name: medicalTestPrisma.patient.name,
                },
                doctor: {
                    name: medicalTestPrisma.doctor.name,
                    experience: medicalTestPrisma.doctor.experience,
                },
            };
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching medical tests for the doctor.');
    }
};

const getDoctorByIdId = async (id: number): 
    Promise<Doctor | null> => {
    try {
       
        const doctorPrisma = await database.doctor.findUnique({
            where: { id: id },
            include: { user: true }
        })
        return Doctor.from(doctorPrisma as any)

    } catch (error) {
        throw new Error(`Doctor with id {${id}} couldn't be found`)
    }
}


const getDoctorByUserEmail = async (email: string): Promise<Doctor | null> => {
    try {
        const doctorPrisma = await database.doctor.findFirst({
            where: {
                user: {
                    email: email,
                },
            },
            include: { user: true },
        });
        return doctorPrisma ? Doctor.from(doctorPrisma as any) : null;
    } catch (error) {
        throw new Error(`Error fetching doctor by user email ${email}: ${error.message}`);
    }
};


const addAppointmentToDoctorById = async (doctorId: number, appointmentInput: AppointmentInput): Promise<Doctor> => {
    try {
        // Retrieve the doctor by ID
        const doctor = await database.doctor.findUnique({
            where: { id: doctorId },
            include: { user: true },
        });

        if (!doctor) {
            throw new Error(`Doctor with ID ${doctorId} not found.`);
        }

        // Create the appointment
        const appointment = await database.appointment.create({
            data: {
                date: appointmentInput.date,
                time: appointmentInput.time,
                doctorId: doctorId,
                patientId: appointmentInput.patient?.id,
                medicalRecordId: appointmentInput.medicalRecord?.id,
            },
            include: {
                patient: true,
                medicalRecord: true,
                medicalTest: true,
            },
        });

        // Update the doctor's appointments
        const updatedDoctor = await database.doctor.update({
            where: { id: doctorId },
            data: {
                appointment: {
                    connect: { id: appointment.id },
                },
            },
            include: { user: true },
        });

        return Doctor.from(updatedDoctor);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while adding the appointment to the doctor.');
    }
};

const getAppointementsByDoctor = async (doctorId: number) => {
    try {
        const appointmentsPrisma = await database.appointment.findMany({
            where: { doctorId: doctorId },
            include: {
                patient: true,
                doctor: true,
                medicalRecord: true,
                medicalTest: true
            },
        });

        return appointmentsPrisma.map((appointmentPrisma) => {
            return {
                id: appointmentPrisma.id,
                time: appointmentPrisma.time,
                date: appointmentPrisma.date,
                patient: {
                    id: appointmentPrisma.patient.id,
                    name: appointmentPrisma.patient.name,
                },
                doctor: {
                    name: appointmentPrisma.doctor.name,
                    experience: appointmentPrisma.doctor.experience,
                },
            };
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching appointements for the doctor.');
    }
};
const getDoctorByName = async (name: string): Promise<Doctor | null> => {
    try {
        const doctorPrisma = await database.doctor.findFirst({
            where: {
                name: name,
            },
            include: { user: true },
        });
        return doctorPrisma ? Doctor.from(doctorPrisma as any) : null;
    } catch (error) {
        throw new Error(`Error fetching doctor by name ${name}: ${error.message}`);
    }
};
export default { getDoctorByName, getAppointementsByDoctor, addAppointmentToDoctorById, getDoctorByUserEmail, getDoctorByIdId, getAllDoctors, getAllMedicalTestsByDoctor, addDoctor, deleteDoctorById, updateDoctor }
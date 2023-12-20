import { AppointmentInput, MedicalRecordInput, MedicalTestInput } from "../../types/types";
import { database } from "../../util/db.server"
import { Appointment } from "../model/appointment"
import { MedicalTest } from "../model/medicalTest";


const getAllAppointments = async (): Promise<Appointment[]> => {
    try {
        const appointmentsPrisma = await database.appointment.findMany({
            include: {
                doctor: { include: { user: true } },
                patient: { include: { user: true } },
                medicalRecord: { include: { doctor: { include: { user: true } }, patient: { include: { user: true } } } },
                medicalTest: { include: { doctor: { include: { user: true } }, patient: { include: { user: true } } } },
            }
        });
        const appointments = appointmentsPrisma.map((appointmentPrisma) => {
            // Check for null medicalRecord or medicalTest
            const medicalRecord = appointmentPrisma.medicalRecord || null;
            const medicalTests = appointmentPrisma.medicalTest || null;

            // Extract nested user property from doctor and patient
            const doctorUser = appointmentPrisma.doctor.user;
            const patientUser = appointmentPrisma.patient.user;

            // Create a new structure for doctor and patient with the user property
            const doctorWithUser = { ...appointmentPrisma.doctor, user: doctorUser };
            const patientWithUser = { ...appointmentPrisma.patient, user: patientUser };

            // Create a new appointment object with the updated structure
            return Appointment.from({
                ...appointmentPrisma,
                doctor: doctorWithUser,
                patient: patientWithUser,
                medicalRecord,
                medicalTests,
            });
        });

        return appointments;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAppointmentById = async (appointmentId: number): Promise<Appointment | null> => {
    try {
        const appointmentPrisma = await database.appointment.findUnique({
            where: { id: appointmentId },
            include: {
                doctor: { include: { user: true } },
                patient: { include: { user: true } },
                medicalRecord: { include: { doctor: { include: { user: true } }, patient: { include: { user: true } } } },
                medicalTest: { include: { doctor: { include: { user: true } }, patient: { include: { user: true } } } },
            }
        });

        if (!appointmentPrisma) {
            return null; // Return null if appointment is not found
        }

        // Check for null medicalRecord or medicalTest
        const medicalRecord = appointmentPrisma.medicalRecord || null;
        const medicalTests = appointmentPrisma.medicalTest || null;

        // Extract nested user property from doctor and patient
        const doctorUser = appointmentPrisma.doctor.user;
        const patientUser = appointmentPrisma.patient.user;

        // Create a new structure for doctor and patient with the user property
        const doctorWithUser = { ...appointmentPrisma.doctor, user: doctorUser };
        const patientWithUser = { ...appointmentPrisma.patient, user: patientUser };

        // Create a new appointment object with the updated structure
        const appointment = Appointment.from({
            ...appointmentPrisma,
            doctor: doctorWithUser,
            patient: patientWithUser,
            medicalRecord,
            medicalTests,
        });

        return appointment;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const addAppointment = async ({
    date,
    time,
    patient,
    doctor,
    medicalRecord
}: AppointmentInput): Promise<Appointment> => {
    try {
       const appointmentPrisma = await database.appointment.create({
            data: {
                date,
                time,
                patient: { connect: { id: patient.id } },
                doctor: { connect: { id: doctor.id } },
                medicalRecord: medicalRecord ? { connect: { id: medicalRecord.id } } : undefined,
            },
            include: {
                doctor: { include: { user: true } },
                patient: { include: { user: true } },
            },
        });
        

        console.log("Appointment created successfully:", appointmentPrisma);

        return Appointment.from(appointmentPrisma as any);
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to add appointment. Reason: ${error.message}`);
    }
};

const addMedicalTestsToAppointment = async ({
    appointment,
    medicalTests,
}: {
    appointment: AppointmentInput;
    medicalTests: MedicalTestInput[];
}): Promise<Appointment> => {
    try {
        // Log input for debugging
        console.log('Adding medical tests to appointment. Appointment:', appointment);
        console.log('Medical tests:', medicalTests);

        // Create medical tests in the database
        const createdMedicalTests = await Promise.all(
            medicalTests.map(async (medicalTest) => {
                const createdMedicalTest = await database.medicalTest.create({
                    data: {
                        name: medicalTest.name,
                        cost: medicalTest.cost,
                        description: medicalTest.description,
                        patient: { connect: { id: medicalTest.patient.id } },
                        doctor: { connect: { id: medicalTest.doctor.id } },
                    },
                });

                return createdMedicalTest;
            })
        );

        const medicalTestConnectArray = createdMedicalTests.map((medicalTest) => ({
            id: medicalTest.id,
        }));

        // Update appointment to connect medical tests
        await database.appointment.update({
            where: {
                id: appointment.id,
            },
            data: {
                medicalTest: {
                    connect: medicalTestConnectArray,
                },
            },
        });

        // Log success for debugging
        console.log('Medical tests added successfully.');

        return getAppointmentById(appointment.id);
    } catch (error) {
        // Log the error for debugging
        console.error('Error adding medical tests to appointment:', error);

        throw new Error('Database error. See server log for details.');
    }
};

const addMedicalRecordToAppointment = async ({
    appointmentId,
    medicalRecordId
}: {
    appointmentId: number;
    medicalRecordId: number;
}): Promise<Appointment> => {
    try {
        // Update appointment to connect existing medical record
        await database.appointment.update({
            where: {
                id: appointmentId,
            },
            data: {
                medicalRecord: {
                    connect: { id: medicalRecordId },
                },
            },
        });

        // Log success for debugging
        console.log('Medical record connected successfully to the appointment.');

        return getAppointmentById(appointmentId);
    } catch (error) {
        // Log the error for debugging
        console.error('Error connecting medical record to appointment:', error);

        throw new Error('Database error. See server log for details.');
    }
};
const getAllMedicalTestForAppointment = async (appointmentId: number): Promise<MedicalTest[]> => {
    try {
        // Find the appointment with medical tests using Prisma
        const appointmentPrisma = await database.appointment.findUnique({
            where: { id: appointmentId },
            include: {
                medicalTest: {
                    include: {
                        doctor: { include: { user: true } },
                        patient: { include: { user: true } },
                    },
                },
            },
        });

        if (!appointmentPrisma) {
            throw new Error('Appointment not found.');
        }

        // Check for null medical tests
        const medicalTests = appointmentPrisma.medicalTest || [];

        // Map and transform the Prisma medical tests to the desired structure
        const transformedMedicalTests = medicalTests.map((medicalTest) => {
            // Extract nested user property from doctor and patient
            const doctorUser = medicalTest.doctor.user;
            const patientUser = medicalTest.patient.user;

            // Create a new structure for doctor and patient with the user property
            const doctorWithUser = { ...medicalTest.doctor, user: doctorUser };
            const patientWithUser = { ...medicalTest.patient, user: patientUser };

            // Create a new MedicalTest object with the updated structure
            return MedicalTest.from({
                ...medicalTest,
                doctor: doctorWithUser,
                patient: patientWithUser,
            });
        });

        return transformedMedicalTests;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllMedicalTestForAppointment, addMedicalRecordToAppointment, addAppointment, addMedicalTestsToAppointment, getAllAppointments, getAppointmentById
}

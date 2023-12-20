
import doctorDb from "../domain/data-access/doctor.db";
import { Doctor } from "../domain/model/doctor";
import { User } from "../domain/model/user";
import { AppointmentInput, DoctorInput } from "../types/types";


const getAllDoctors = async (): Promise<Doctor[]> =>
    doctorDb.getAllDoctors();

const getDoctorById = async (id: number): Promise<Doctor> => {
    const doctor = await doctorDb.getDoctorByIdId(id);
    return doctor;
}

const addDoctor = async (doctor: DoctorInput): Promise<Doctor> => {
    Doctor.validate(doctor)
    if (!doctor.user || !doctor.user.email) {
        throw new Error("User email is missing.");
    }
    const existingPatientWithUser = await doctorDb.getDoctorByUserEmail(doctor.user.email);
    if (existingPatientWithUser) {
        throw new Error("User with this email is already associated with a doctor.");
    }
    const newDoctor = await doctorDb.addDoctor(doctor);
    return newDoctor;

};
const deleteDoctor = async (id: number) => {
    await getDoctorById(id)
    return await doctorDb.deleteDoctorById(id);

};

const updateDoctor = async (doctor: DoctorInput): Promise<Doctor> => {
    Doctor.validate(doctor)
    try {
        if (!doctor.user || !doctor.user.email) {
            throw new Error("User email is missing.");
        }
        const existingDoctor = await doctorDb.getDoctorByIdId(doctor.id);
        if (existingDoctor && existingDoctor.user?.email !== doctor.user?.email) {
            const doctorWithNewEmail = await doctorDb.getDoctorByUserEmail(doctor.user?.email || '');
            if (doctorWithNewEmail) {
                throw new Error("User with this email is already associated with a doctor.");
            }
        }
        return doctorDb.updateDoctor(doctor)
    } catch (error) {
        throw new Error(error.message);
    }
}
const getAllMedicalTestsByDoctor = async (doctorId: number) => {

    return await doctorDb.getAllMedicalTestsByDoctor(doctorId);
};

const getAppointementsByDoctor = async (doctorId: number) => {

    return await doctorDb.getAppointementsByDoctor(doctorId);
};

const addAppointmentToDoctorById = async (doctorId: number, appointmentInput: AppointmentInput): Promise<Doctor> => {
    try {
        const updatedDoctor = await doctorDb.addAppointmentToDoctorById(doctorId, appointmentInput);
        return updatedDoctor;
    } catch (error) {
        throw new Error(error.message);
    }
};
const getDoctorByUserEmail = async (email: string): Promise<Doctor> => {
    const doctor = await doctorDb.getDoctorByUserEmail(email);
    return doctor;
};

export default { getDoctorByUserEmail, getAppointementsByDoctor, getDoctorById, getAllMedicalTestsByDoctor, getAllDoctors, addDoctor, deleteDoctor, updateDoctor, addAppointmentToDoctorById }
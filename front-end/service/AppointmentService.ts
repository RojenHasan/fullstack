import { Appointment, MedicalTest } from "../types"

const getAllAppointments = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/appointments", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }

    })
}


const updateAppointment = async (appointment: Appointment) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/appointments",
        {
            body: JSON.stringify(appointment),
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })
}

const getAppointmentById = async (appointmentId: string) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/appointments/${appointmentId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    })
}
const addAppointment = async (appointment: Appointment) => {

    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/appointments",
        {
            body: JSON.stringify(appointment),
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })
}


const addMedicalRecordToAppointment = async (appointmentId: number, medicalRecordId: number) => {

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${appointmentId}/addMedicalRecord`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({ medicalRecordId }),
    });
};
const addMedicalTestToAppointment = async (appointmentId: number, medicalTest: MedicalTest) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${appointmentId}/addMedicalTest`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({ medicalTest }),
    });
};

const getAllMedicalTestsForAppointement = async (appointmentId: number) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/appointments/${appointmentId}/medicalTests`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
    });
};



const AppointmentService = {
    getAllMedicalTestsForAppointement, addMedicalTestToAppointment, addAppointment, getAllAppointments, getAppointmentById, addMedicalRecordToAppointment
}

export default AppointmentService
import { Doctor } from "../types"

const getAllDoctors = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/doctors", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }

    })
}


const updateDoctor = async (doctor: Doctor) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/doctors",
        {
            body: JSON.stringify(doctor),
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })
}

const getDoctorById = async (doctorId: number) => {
    console.log(sessionStorage.getItem("token"));
    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/doctors/${doctorId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    });
};

const getDoctorById1 = async (doctorId: number) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/doctors/${doctorId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    })
}
const addDoctor = async (doctor: Doctor) => {

    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/doctors",
        {
            body: JSON.stringify(doctor),
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })
}
const deleteDoctor = async ({ id }: { id: number }) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/doctors/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    });

    if (response.status === 204) {
        // Deletion successful
        return true;
    } else {
        // Handle other response statuses or throw an error
        throw new Error(`Failed to delete doctor. Status: ${response.status}`);
    }
};
const getMedicalTestsByDoctor = async (doctorId: number) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/doctors/${doctorId}/medical-tests`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    });
};


const addAppointmentToDoctorById = async (doctorId: number, appointmentData: any) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/doctors/${doctorId}/appointments`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify(appointmentData),
    });
};
const getAllAppointmentsForDoctor = async (doctorId: number) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/doctors/${doctorId}/appointments`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
    });
};

const DoctorService = {
    updateDoctor, addDoctor, getDoctorById, getAllDoctors, deleteDoctor, getMedicalTestsByDoctor,
    addAppointmentToDoctorById, getAllAppointmentsForDoctor, getDoctorById1
}

export default DoctorService
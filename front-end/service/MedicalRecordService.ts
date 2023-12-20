import { MedicalRecord } from "@/types"

const getAllMedicalRecord = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL+ "/medicalrecords",{
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization:  `Bearer ${sessionStorage.getItem("token")}`
        }

    })
}

const addMedicalRecord = async (medicalrecord:MedicalRecord) => {
   
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/medicalrecords",
    {
        body: JSON.stringify(medicalrecord),
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization:  `Bearer ${sessionStorage.getItem("token")}`
          }
    })
}



const MedicalRecordService = {
    getAllMedicalRecord, addMedicalRecord
}

export default MedicalRecordService
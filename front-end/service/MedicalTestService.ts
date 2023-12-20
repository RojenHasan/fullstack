import { MedicalTest } from "@/types"

const getAllMedicalTest = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL+ "/medicalTests",{
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization:  `Bearer ${sessionStorage.getItem("token")}`
        }

    })
}

const addMedicalTest = async (medicalTest:MedicalTest) => {
   
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/medicalTests",
    {
        body: JSON.stringify(medicalTest),
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization:  `Bearer ${sessionStorage.getItem("token")}`
          }
    })
}



const MedicalTestService = {
    getAllMedicalTest, addMedicalTest
}
export default MedicalTestService
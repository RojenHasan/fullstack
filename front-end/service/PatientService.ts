const getAllPatients = async () => {
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/patients",
    {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`

      }
    })
}

const addPatient = async (patientData: any) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });
    return response;
  } catch (error) {
    console.error('Error registering patient:', error);
    throw error;
  }
}
const getPatientById = async (id: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}patients/${id}`);
    return await response.json();
  } catch (error) {
    console.error('Error getting patient by id:', error);
    throw error;
  }
}
const PatientService = {
  getAllPatients, getPatientById, addPatient
};

export default PatientService;

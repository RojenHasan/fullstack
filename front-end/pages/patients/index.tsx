import Head from "next/head"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

import PatientsOverviewTable from "@/components/patient/PatientOverviewTable"
import { useEffect, useState } from "react"
import { Patient } from "../../types"
import PatientService from "@/service/PatientService"

const Patients: React.FC = () => {
    const [patients, setPatients] = useState<Array<Patient>>();

    const getPatients = async () => {
        const response = await PatientService.getAllPatients();
        const patientss = await response.json()
        setPatients(patientss)
    }

    useEffect(() => {
        getPatients()
    }, 
    []
)

    return (
        <>
            <Head>
                <title>Patients</title>
            </Head>
            <Header />
            <main>
                <h1> Patients</h1>
                <section>
                    {patients && (
                        <PatientsOverviewTable patients={patients}/>
                    )}
                </section>
                                  
               
            </main>
            <Footer></Footer>
        </>
    )       
}

export default Patients
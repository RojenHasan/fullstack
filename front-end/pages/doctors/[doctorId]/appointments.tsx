import Head from "next/head"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useEffect, useState } from "react"
import { Appointment, Doctor } from "@/types"
import { useRouter } from "next/router"
import AppointementForm from "@/components/appointments/AppointementForm"


const Patients: React.FC = () => {
    const [doctor, setDoctor] = useState<Doctor | undefined>(); 
    const router = useRouter()
    const {doctorId} = router.query

    return (
        <>
            <Head>
                <title>Add Appointment </title>
            </Head>
            <Header></Header>
            <h4 className="text-center mb-4">Add Appointment for doctor :{doctorId}</h4>
            <main>
                <section className="row justify-content-center min-vh-100">
                    <div className="col-4">
                        <AppointementForm/>
                    </div>
                </section>
            </main> 
        <   Footer></Footer>

        </>    
    )    
}

export default Patients
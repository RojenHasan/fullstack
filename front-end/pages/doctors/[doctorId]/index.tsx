import { useRouter } from "next/router"
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"

import DoctorInfoTable from "@/components/doctors/DoctorInfoTable"
import DoctorService from "@/service/DoctorService"
import { useEffect, useState } from "react"
import Head from "next/head"
import { Doctor } from "../../../types"


const DoctorInfo = () => {
    const [doctor, setDoctor] = useState<Doctor>();
    const router = useRouter()

    const getDoctorInfo = async () => {
        const doctorId: number = parseInt(router.query.doctorId as string)
        const [doctorResponse] = await Promise.all([DoctorService.getDoctorById(doctorId)])
        const [doctorFound] = await Promise.all([doctorResponse.json()])
        setDoctor(doctorFound)
    }

    useEffect(() => {
        if (router.isReady)
            getDoctorInfo()
    }
        , [router.isReady])

    return (
        <>
            <Head>
                <title>Doctor Info</title>
            </Head>
            <Header />
            <main>
                <h1> Info of {doctor && doctor.name}</h1>
                {!doctor && <p>Loading</p>}
                <section>
                    {doctor &&
                        <DoctorInfoTable doctor={doctor} />}
                </section>
            </main>
            <Footer></Footer>

        </>
    )
}

export default DoctorInfo
import { useRouter } from "next/router"
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"

import DoctorService from "@/service/DoctorService"
import { useEffect, useState } from "react"
import Head from "next/head"
import { Doctor } from "../../../types"
import DeleteDoctor from "@/components/doctors/DeleteDoctorConfirmation"

const DoctorInfo: React.FC = () => {
    const [doctor, setDoctor] = useState<Doctor | undefined>();
    const router = useRouter()
    const { doctorId } = router.query

    const doctorToDelete = async () => {
        try {
            if (doctorId) {
                const id = Array.isArray(doctorId) ? doctorId[0] : doctorId;
                const doctorResponse = await DoctorService.getDoctorById(Number(id));
                console.log("doctorId:", doctorId);
                console.log("router.query:", router.query);
                const doctorFound = await doctorResponse.json();
                setDoctor(doctorFound);
            }
        } catch (error) {
            console.error("Error fetching doctor:", error);
            // Handle error, e.g., show an error message to the user
        }
    }

    useEffect(() => {
        doctorToDelete();
    }, [doctorId])

    return (
        <>
            <Head>
                <title>Delete Doctor</title>
            </Head>

            <main>
                <h1> Info of {doctor && doctor.name}</h1>
                {!doctorId && <p>Loading</p>}
                <section>
                    {doctor && <DeleteDoctor doctor={doctor} />}
                </section>
            </main>
            <Footer />
        </>
    )
}

export default DoctorInfo;
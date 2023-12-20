import Head from "next/head"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

import DoctorsOverviewTable from "@/components/doctors/DoctorsOverviewTable"
import { useEffect, useState } from "react"
import { Appointment, Doctor, MedicalTest } from "../../types"
import DoctorService from "@/service/DoctorService"
import MedicalTestsOverviewTable from "@/components/medicalTests/medicalTestOverviewTable"
import AppointmentService from "@/service/AppointmentService"
import AppointmentsOverviewTable from "@/components/appointments/AppointmentsOverviewTable"

const Appointment: React.FC = () => {

    return (
        <>
            <Head>
                <title>Appointments</title>
            </Head>
            <Header />
            <main>
                <h1>Appointement created Successfully</h1>
                
            </main>
            <Footer></Footer>
        </>
    );
};

export default Appointment;
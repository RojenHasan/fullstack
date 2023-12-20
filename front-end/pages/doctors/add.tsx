import Head from "next/head"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import DoctorForm from "@/components/doctors/DoctorForm"

const Add: React.FC = () => {
   return (
        <>
            <Head>
                <title>Add Doctor</title>
            </Head>
            <Header></Header>
            <h4 className="text-center mb-4">Add Doctor</h4>
            <main>
                <section className="row justify-content-center min-vh-100">
                    <div className="col-4">
                        <DoctorForm/>
                    </div>
                </section>
            </main> 
        <   Footer></Footer>

        </>    
    )
}

export default Add


import Head from "next/head"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import PatientForm from "@/components/patient/PatientForm"

const Add: React.FC = () => {
   return (
        <>
            <Head>
                <title>Add Patient</title>
            </Head>
            <Header></Header>
            <h4 className="text-center mb-4">Add Patient</h4>
            <main>
                <section className="row justify-content-center min-vh-100">
                    <div className="col-4">
                        <PatientForm/>
                    </div>
                </section>
            </main> 
        <   Footer></Footer>

        </>    
    )
}

export default Add


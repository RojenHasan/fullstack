import Head from "next/head"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import MedicalRecordForm from "@/components/medicalRecords/medicalRecordForm"

const Add: React.FC = () => {
   return (
        <>
            <Head>
                <title>Add MedicalRecord</title>
            </Head>
            <Header></Header>
            <h4 className="text-center mb-4">Add MedicalRecord</h4>
            <main>
                <section className="row justify-content-center min-vh-100">
                    <div className="col-4">
                        <MedicalRecordForm/>
                    </div>
                </section>
            </main> 
        <   Footer></Footer>

        </>    
    )
}

export default Add


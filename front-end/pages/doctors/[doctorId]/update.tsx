import Head from "next/head"
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import UpdateDoctor from "@/components/doctors/UpdateDoctor"

const Update: React.FC = () => {
   return (
        <>
            <Head>
                <title>Update Doctor</title>
            </Head>
            <Header></Header>
            <h4 className="text-center mb-4">Update Doctor</h4>
            <main>
                <section className="row justify-content-center min-vh-100">
                    <div className="col-4">
                        <UpdateDoctor />
                    </div>
                </section>
            </main> 
        <   Footer></Footer>

        </>    
    )
}

export default Update


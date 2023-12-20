import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MedicalTestForm from "@/components/medicalTests/medicalTestForm";

const Add: React.FC = () => {
  const router = useRouter();
  const { appointmentId } = router.query;
  console.log("Add component - appointmentId:", appointmentId);


  return (
    <>
      <Head>
        <title>Add MedicalTest</title>
      </Head>
      <Header />
      <h4 className="text-center mb-4">Add MedicalTest</h4>
      <main>
        <section className="row justify-content-center min-vh-100">
          <div className="col-4">
            <MedicalTestForm appointmentId={appointmentId as string} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Add;

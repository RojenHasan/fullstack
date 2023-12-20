import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import SignForm from '@/components/users/signForm';
import { useTranslation } from 'next-i18next'; 
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Authentication: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      
      <Header />
      <main className="vh-100">
        <section className="row justify-content-evenly">
          <SignForm method="signup" header="Sign up" />
        </section>
        <Link href="/" className="btn btn-outline-primary font-bold text-stone-500">
        {t('back')}
        </Link>
      </main>
      <Footer />
    </>
  );
};
export const getServerSideProps = async (context : any) => {
  const {locale} = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  }
}

export default Authentication;
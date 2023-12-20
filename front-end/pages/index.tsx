import Header from '../components/Header';
import Footer from '../components/Footer';
import SignForm from '../components/users/signForm';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Authentication: React.FC = () => {
  const { t } = useTranslation();

  console.log('Translation Key:', 'authentication.login.header', t('authentication.login.header'));

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center">
        <section className="max-w-md w-full p-4 bg-white rounded-lg shadow-lg">
          <SignForm method="login" header="Login" />
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Button>
                <Link href="/signup" className="text-stone-500 font-bold">Sign up</Link>
              </Button>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Authentication;

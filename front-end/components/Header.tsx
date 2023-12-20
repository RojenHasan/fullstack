import Head from 'next/head';
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { User } from '@/types';
import { useEffect, useState } from 'react';
import Language from './Language';


const Header: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleToggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogout = () => {
    // Clear session data
    sessionStorage.clear();
    window.location.href = '/';
  };

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser != null) {
      try {
        const user: User = JSON.parse(sessionUser);
        if (user != undefined) {
          setUser(user);
        }
      } catch (error) {
        console.error("Error parsing user from session:", error);
        // Handle the error, e.g., clear the session user data
        sessionStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <header className={`p-3 mb-1 border-b ${router.pathname === '/' ? 'active' : ''}`}>
      <Link href="/" >
        <h1>
        General Practice Clinic
        </h1>
      </Link>
      <div className="flex items-center justify-end">
      <Language />
        <button
          className="lg:hidden  ml-auto"
          onClick={handleToggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      <nav className={`nav justify-content-center mt-6 ${isMobileMenuOpen ? 'block' : 'hidden lg:flex'
        } lg:mt-0`}>

        {user ? (
          <>
            {user.role === 'admin' ? (
              <>
                <Link href="/doctors" className={`nav-link px-4 fs-5 ${router.pathname === '/doctors' ? 'text-1xl font-bold underline' : 'text-black'} hover:bg-CE6E78 hover:px-4 py-2`}>
                  Doctors
                </Link>
                <Link href="/doctors/add" className={`nav-link px-4 fs-5 ${router.pathname === '/doctors/add' ? 'text-1xl font-bold underline' : 'text-black'} hover:bg-CE6E78 hover:px-4 py-2`}>
                  Add doctor
                </Link>
                <Link href="/patients" className={`nav-link px-4 fs-5 ${router.pathname === '/patients' ? 'text-1xl font-bold underline' : 'text-black'} hover:bg-CE6E78 hover:px-4 py-2`}>
                  Patients
                </Link>
                <Link href="/patients/add" className={`nav-link px-4 fs-5 ${router.pathname === '/patients/add' ? 'text-1xl font-bold underline' : 'text-black'} hover:bg-CE6E78 hover:px-4 py-2`}>
                  Add patient
                </Link>
                <Link href="/appointments" className={`nav-link px-4 fs-5 ${router.pathname === '/appointments' ? 'text-1xl font-bold underline' : 'text-black'} hover:bg-CE6E78 hover:px-4 py-2`}>
                  Appointments overview
                </Link>
                <Link href="/appointments/add" className={`nav-link px-4 fs-5 ${router.pathname === '/appointments/add' ? 'text-1xl font-bold underline' : 'text-black'} hover:bg-CE6E78 hover:px-4 py-2`}>
                  Make an appointment
                </Link>
              </>
            ) : (

              <Link href="/doctors" className={`nav-link px-4 fs-5 ${router.pathname === '/doctors' ? 'text-1xl font-bold underline' : 'text-black'} hover:bg-CE6E78 hover:px-4 py-2`}>
                Doctors
              </Link>
            )}

            <Link href="/#" className={`nav-link px-4 fs-5 ${router.pathname === '/logout' ? 'text-1xl font-bold underline' : 'text-black'} hover:bg-CE6E78 hover:px-4 py-2`} onClick={handleLogout}>
              Uitloggen
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/"
              className={`nav-link px-4 fs-5 ${router.pathname === '/' ? 'text-1xl font-bold underline' : 'text-sm text-black'} hover:bg-CE6E78 hover:px-4 py-2`}>
              Home
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

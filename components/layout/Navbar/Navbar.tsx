import { useEffect, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Barlow } from 'next/font/google';
import Logo from '../Logo';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';

const barlow = Barlow({
  weight: ['300', '400', '500', '600', '800'],
  subsets: ['latin'],
});

// TODO Mobile menu

export default function Navbar() {
  const { data: session } = useSession();

  const [windowWidth, setWindowWidth] = useState<number>();

  useLayoutEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const linksToRender = session ? (
    <>
      <Link href='/' className='navbar-link'>
        Alla önskelistor
      </Link>
      <Link href='/user' className='navbar-link'>
        Mina listor
      </Link>
      <Link href='/add-new-list' className='navbar-link'>
        Lägg till lista
      </Link>
      <button
        className='rounded bg-slate-100 p-2 text-sm text-slate-900 hover:bg-slate-200'
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        Logga ut
      </button>
    </>
  ) : (
    <>
      <Link href='/login' className='navbar-link'>
        Logga in
      </Link>
      <Link href='/register' className='navbar-link'>
        Registrera
      </Link>
    </>
  );

  return (
    <header
      className={`relative flex items-center justify-between bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-700 p-8 text-white shadow drop-shadow ${barlow.className}`}
    >
      <Logo />

      {windowWidth && windowWidth < 768 ? (
        <MobileNav>{linksToRender}</MobileNav>
      ) : (
        <DesktopNav>{linksToRender}</DesktopNav>
      )}
    </header>
  );
}

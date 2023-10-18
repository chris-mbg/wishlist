import { useAuthContext } from '@/contexts/AuthContext';
// import signOut from '@/firebase/auth/signout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from './Logo';
import { Barlow } from 'next/font/google';
import { useSession, signOut } from 'next-auth/react';

const barlow = Barlow({
  weight: ['300', '400', '500', '600', '800'],
  subsets: ['latin'],
});

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <header
      className={`flex items-center justify-between bg-gradient-to-t from-slate-500 via-slate-700 to-slate-900 p-8 text-white shadow ${barlow.className}`}
    >
      <Logo />
      <nav>
        {!session && (
          <div className='flex gap-8'>
            <Link href='/login'>Logga in</Link>
            <Link href='/register'>Registrera</Link>
          </div>
        )}
        {session && (
          <div className='flex items-center gap-4 text-white'>
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
              className='rounded bg-slate-100 p-2 text-sm text-slate-800 hover:bg-slate-300'
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Logga ut
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

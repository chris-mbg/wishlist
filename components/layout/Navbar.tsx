import { useAuthContext } from '@/contexts/AuthContext';
import signOut from '@/firebase/auth/signout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from './Logo';
import { Barlow } from 'next/font/google';

const barlow = Barlow({
  weight: ['300', '400', '500', '600', '800'],
  subsets: ['latin'],
});

export default function Navbar() {
  const router = useRouter();
  const { user } = useAuthContext();

  const handleLogOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header
      className={`flex items-center justify-between bg-gradient-to-t from-slate-500 via-slate-700 to-slate-900 p-8 text-white shadow ${barlow.className}`}
    >
      <Logo />
      <nav>
        {!user && <Link href='/login'>Logga in</Link>}
        {user && (
          <div className='flex items-center gap-4 text-white'>
            <p className='text-xs'>Inloggad</p>
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
              className='rounded bg-white p-2 text-gray-800 hover:bg-gray-300'
              onClick={handleLogOut}
            >
              Logga ut
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

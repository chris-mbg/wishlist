import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import GoogleButton from '@/components/auth/GoogleButton';
import LoginForm from '@/components/auth/LoginForm';
import ErrorAlert from '@/components/ui/ErrorAlert';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState('');

  const { data: session, status } = useSession();

  const handleLoginSubmit = async (email: string, password: string) => {
    setError('');

    signIn('credentials', {
      email,
      password,
      redirect: false,
    })
      .then((res) => {
        if (!res) {
          throw new Error('Could not log you in');
        }
        if (res.ok) {
          window.location.replace('/');
        } else {
          setError(res.error ?? 'Could not log you in, check your credentials');
        }
      })
      .catch((err) => setError(err.message ?? 'något gick galet..'));
  };

  if (status === 'authenticated') {
    router.push('/');
  }

  return (
    <div className='mx-auto text-center md:w-4/5 xl:w-3/5'>
      <h1 className='page-title'>Logga in</h1>
      {error && <ErrorAlert className='md:w-4/5 lg:w-3/5 '>{error}</ErrorAlert>}
      <div className='flex justify-center'>
        <GoogleButton />
      </div>
      <hr className='mx-auto my-4 border border-red-400 md:w-4/5 lg:w-3/5' />

      <LoginForm onSubmit={handleLoginSubmit} />

      <div className=''>
        <p className=''>Har du inget konto?</p>
        <Link
          href='/register'
          className='inline font-semibold hover:text-cyan-200'
        >
          Registrera dig här
        </Link>
      </div>
    </div>
  );
}

import GoogleButton from '@/components/auth/GoogleButton';
import LoginForm from '@/components/auth/LoginForm';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const handleLoginSubmit = async (email: string, password: string) => {
    const response = await signIn('credentials', {
      email,
      password,
      callbackUrl: 'http://localhost:3000/',
    });
  };

  if (status === 'authenticated') {
    router.push('/');
  }

  return (
    <div className='text-center'>
      <h1 className='page-title'>Logga in</h1>
      <div className='flex justify-center'>
        <GoogleButton />
      </div>
      <p className='mt-6'>eller med email och lösenord </p>
      <LoginForm onSubmit={handleLoginSubmit} />
      {/* {error && (
        <small className="block w-full px-2 text-red-600">{error}</small>
      )} */}

      <div className=''>
        <p className=''>Har du inget konto?</p>
        <Link href='/register' className='inline font-semibold hover:underline'>
          Registrera dig här
        </Link>
      </div>
    </div>
  );
}

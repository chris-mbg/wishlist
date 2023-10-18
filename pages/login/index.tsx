import GoogleButton from '@/components/auth/GoogleButton';
import LoginForm from '@/components/auth/LoginForm';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const handleLoginSubmit = async (email: string, password: string) => {
    signIn('credentials', {
      email,
      password,
    });
  };

  if (status === 'authenticated') {
    router.push('/');
  }

  return (
    <div className=''>
      <div className='flex w-full items-center justify-center px-2 text-lg'>
        <GoogleButton />
      </div>
      <LoginForm onSubmit={handleLoginSubmit} />
      {/* {error && (
        <small className="block w-full px-2 text-red-600">{error}</small>
      )} */}

      <div className='w-full px-2 py-4'>
        <p>
          <Link
            href='/register'
            className='text-lightColor hover:text-primaryColor hover:underline'
          >
            Skapa ett konto
          </Link>
        </p>
      </div>
    </div>
  );
}

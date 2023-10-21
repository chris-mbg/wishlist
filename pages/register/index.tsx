import RegisterForm from '@/components/auth/RegisterForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function RegisterPage() {
  const session = useSession();
  const router = useRouter();

  if (session.status === 'authenticated') {
    router.push('/');
  }

  return <RegisterForm />;
}

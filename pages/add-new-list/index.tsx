import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]';
import ListForm from '@/components/add-list/ListForm';

function NewListPage() {
  const router = useRouter();
  const session = useSession();

  if (!session) {
    router.push('/');
  }

  return (
    <>
      <h1 className='page-title'>Skapa en ny önskelista</h1>
      <ListForm />
    </>
  );
}

export default NewListPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

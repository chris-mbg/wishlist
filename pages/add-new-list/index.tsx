import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { firebaseAdmin } from '@/firebase/firebaseAdmin';
import ListForm from '@/components/add-list/ListForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function NewListPage() {
  const router = useRouter();
  const session = useSession();

  if (!session) {
    router.push('/');
  }

  return (
    <>
      <h1 className='my-6 text-center text-2xl font-semibold'>
        Skapa en ny önskelista
      </h1>
      <ListForm />
    </>
  );
}

export default NewListPage;

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   try {
//     const cookies = nookies.get(ctx);
//     const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

//     const { uid, email } = token;

//     return {
//       props: {
//         message: 'User authenticated',
//       },
//     };
//   } catch (err) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/login',
//       },
//       props: {} as never,
//     };
//   }
// }

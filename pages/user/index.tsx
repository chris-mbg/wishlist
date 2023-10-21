import AllLists from '@/components/lists/AllLists';
import { firebaseAdmin } from '@/firebase/firebaseAdmin';
import { index } from '@/firebase/helpers/lists';
import { List } from '@/types/types';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getServerSession } from 'next-auth';
import nookies from 'nookies';
import { authOptions } from '../api/auth/[...nextauth]';
import ListModel from '@/models/List';

function UserPage({ lists }: InferGetServerSidePropsType<GetServerSideProps>) {
  return <AllLists allLists={lists} heading='Alla dina sparade listor' />;
}

export default UserPage;

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  let docs: List[] = [];

  try {
    docs = await ListModel.find({ owner: session.user?.email }).populate(
      'items'
    );
  } catch (err) {
    console.error('Error getting lists...');
  }

  return {
    props: {
      lists: JSON.parse(JSON.stringify(docs)),
    },
  };
}) satisfies GetServerSideProps<{
  lists: List[];
}>;

import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { List } from '@/types/types';
import ListModel from '@/models/List';
import AllLists from '@/components/lists/AllLists';
import dbConnect from '@/utils/dbConnect';

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

  await dbConnect();
  let docs: List[] = [];

  try {
    docs = await ListModel.find({ owner: session.user?.email })
      .sort({ createdAt: -1 })
      .populate('items');
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

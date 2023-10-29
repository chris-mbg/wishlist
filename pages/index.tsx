import {
  GetServerSidePropsContext,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import ListModel from '@/models/List';
import { List } from '@/types/types';
import dbConnect from '@/utils/dbConnect';
import AllLists from '@/components/lists/AllLists';

// TODO Loading context --> show loader
// TODO Error context --> show error toast or similar

export default function Home({
  allLists,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <AllLists allLists={allLists} heading='Alla önskelistor' />;
}

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  let docs: List[] = [];

  try {
    await dbConnect();
    docs = await ListModel.find({}).sort({ createdAt: -1 }).populate('items');
  } catch (err) {
    console.error('Error getting lists...');
  }

  return {
    props: {
      allLists: JSON.parse(JSON.stringify(docs)),
    },
  };
}) satisfies GetServerSideProps<{
  lists: List[];
}>;

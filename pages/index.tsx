import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
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
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <AllLists allLists={allLists} heading='Alla önskelistor' />;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<
  | { props: { allLists: List[] } }
  | { redirect: { permanent: boolean; destination: string } }
> => {
  // const session = await getServerSession(context.req, context.res, authOptions);

  // if (!session) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/login',
  //     },
  //   };
  // }

  let docs: List[] = [];

  try {
    await dbConnect();
    docs = await ListModel.find({}).sort({ createdAt: -1 }).populate('items');
  } catch (err) {
    console.error('Error getting lists...');
  }

  return {
    props: {
      allLists: JSON.parse(JSON.stringify(docs)) as List[],
    },
  };
};

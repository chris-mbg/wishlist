import { GetStaticProps, InferGetStaticPropsType } from 'next';
import ListModel from '@/models/List';
import { List } from '@/types/types';
import dbConnect from '@/utils/dbConnect';
import AllLists from '@/components/lists/AllLists';

export default function Home({
  allLists,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <AllLists allLists={allLists} heading='Alla önskelistor' />;
}

export const getStaticProps = (async () => {
  let docs: List[] = [];

  try {
    await dbConnect();
    docs = await ListModel.find({}).sort({ createdAt: -1 }).populate('items');
  } catch (err) {
    console.error('Error getting lists...', err);
  }

  return {
    props: {
      allLists: JSON.parse(JSON.stringify(docs)),
    },
    revalidate: 60,
  };
}) satisfies GetStaticProps<{
  allLists: List[];
}>;

import AllLists from '@/components/lists/AllLists';
import ListModel from '@/models/List';
import { List } from '@/types/types';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

export default function Home({
  allLists,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <AllLists allLists={allLists} heading='Alla önskelistor' />;
}

export const getStaticProps = (async () => {
  let docs: List[] = [];

  try {
    docs = await ListModel.find({}).populate('items');
    console.log('Home', docs[0].createdAt, docs[0].createdAt instanceof Date);
  } catch (err) {
    console.error('Error getting lists...');
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

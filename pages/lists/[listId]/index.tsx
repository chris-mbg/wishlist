import ListDetail from '@/components/lists/ListDetail';
import ListDetailHeader from '@/components/lists/ListDetailHeader';
import { useAuthContext } from '@/contexts/AuthContext';
import { getOne } from '@/firebase/helpers/list';
import { index } from '@/firebase/helpers/lists';
import { List } from '@/types/types';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

function ListDetailPage({ list }: InferGetStaticPropsType<GetStaticProps>) {
  const { user } = useAuthContext();

  return (
    <>
      {user && user.uid === list.ownerId ? (
        <ListDetailHeader id={list.id} />
      ) : (
        ''
      )}
      <ListDetail list={list} />
    </>
  );
}

export default ListDetailPage;

export const getStaticPaths = (async () => {
  let result;

  try {
    result = await index();
  } catch (err) {
    console.error('Error getting lists...');
  }

  if (!result) {
    return { paths: [], fallback: true };
  }
  const paramsArray = result.map((list) => ({ params: { listId: list.id } }));
  return {
    paths: paramsArray,
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (
  context: GetStaticPropsContext<{ listId: string }>
) => {
  const { listId } = context.params!;

  let result: List | undefined;
  try {
    result = await getOne(listId);
  } catch (err) {
    console.log('Error fetching list', err);
  }

  if (!result) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      list: result,
    },
    revalidate: 60,
  };
}) satisfies GetStaticProps<{ list: List }>;

import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { List } from '@/types/types';
import { getAllLists, getOneList } from '@/utils/lists/list-utils';
import ListDetail from '@/components/lists/ListDetail';
import ListDetailHeader from '@/components/lists/ListDetailHeader';
import { useSession } from 'next-auth/react';

function ListDetailPage({ list }: InferGetStaticPropsType<GetStaticProps>) {
  const { data: session } = useSession();

  return (
    <>
      {session && session.user?.email === list.owner ? (
        <ListDetailHeader id={list._id} />
      ) : (
        ''
      )}
      <ListDetail list={list} />
    </>
  );
}

export default ListDetailPage;

export const getStaticPaths = (async () => {
  const { result, error } = await getAllLists();

  if (!result || error) {
    return { paths: [], fallback: true };
  }

  const paramsArray = result.map((list) => ({
    params: { listId: list._id.toString() },
  }));
  return {
    paths: paramsArray,
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (
  context: GetStaticPropsContext<{ listId: string }>
) => {
  const { listId } = context.params!;

  const { result, error } = await getOneList(listId);

  if (!result || error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      list: JSON.parse(JSON.stringify(result)),
    },
    revalidate: 60,
  };
}) satisfies GetStaticProps<{
  list: List;
}>;

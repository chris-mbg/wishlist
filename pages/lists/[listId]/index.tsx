import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { List } from '@/types/types';
import { getAllLists, getOneList } from '@/utils/lists/list-utils';
import ListDetail from '@/components/lists/ListDetail';

export default function ListDetailPage({
  list,
}: InferGetStaticPropsType<GetStaticProps>) {
  return <ListDetail list={list} />;
}

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

export const getStaticProps = async (
  context: GetStaticPropsContext<{ listId: string }>
): Promise<
  { props: { list: List }; revalidate: number } | { notFound: boolean }
> => {
  const { listId } = context.params!;

  const { result, error } = await getOneList(listId);

  console.log('Result', result);

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
};

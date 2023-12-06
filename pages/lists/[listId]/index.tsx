import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { List } from '@/types/types';
import { getOneList } from '@/utils/lists/list-utils';
import ListDetail from '@/components/lists/ListDetail';

export default function ListDetailPage({
  list,
}: InferGetServerSidePropsType<GetServerSideProps>) {
  return <ListDetail list={list} />;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ listId: string }>
): Promise<{ props: { list: List } } | { notFound: boolean }> => {
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
  };
};

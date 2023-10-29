import { Itim } from 'next/font/google';
import { useSession } from 'next-auth/react';
import { List, ListItem } from '@/types/types';
import { convertDateToLocaleString } from '@/utils/dateHelpers';
import ListDetailItem from './ListDetailItem';
import ListDetailActions from './ListDetailActions';

const itim = Itim({ weight: '400', subsets: ['latin'] });

type ListDetailProps = {
  list: List;
};

function ListDetail({ list }: ListDetailProps) {
  const { data: session } = useSession();

  return (
    <div className='mx-auto md:w-4/5'>
      {!!session && session.user.email === list.owner && (
        <ListDetailActions id={list._id} />
      )}

      <section className='rounded-lg bg-slate-100 p-4 text-slate-900 shadow shadow-slate-300 lg:p-12'>
        <h1
          className={`${itim.className} mb-4 text-center text-2xl md:text-3xl xl:text-4xl`}
        >
          {list.title}
        </h1>
        <div className='mb-2 text-sm md:text-right md:text-base'>
          <time>{convertDateToLocaleString(list.createdAt)}</time>
          <p className='italic'>
            Skapad av:{' '}
            <span className='font-semibold not-italic'>
              {list.owner_username ?? list.owner}
            </span>
          </p>
        </div>
        <ul>
          {list.items.map((item: ListItem, idx: number) => (
            <ListDetailItem key={idx} listItem={item} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default ListDetail;

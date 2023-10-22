import { Itim } from 'next/font/google';
import { List, ListItem } from '@/types/types';
import { convertDateToLocaleString } from '@/utils/dateHelpers';
import ListDetailItem from './ListDetailItem';

const itim = Itim({ weight: '400', subsets: ['latin'] });

type ListDetailProps = {
  list: List;
};

function ListDetail({ list }: ListDetailProps) {
  return (
    <section className='mx-auto w-4/5 rounded-lg bg-slate-100 p-12 shadow-lg shadow-slate-300 lg:w-3/5'>
      <h1 className={`${itim.className} mb-4 text-center text-3xl`}>
        {list.title}
      </h1>
      <div className='text-right'>
        <time>{convertDateToLocaleString(list.createdAt)}</time>
        <p className='italic'>
          Skapad av:{' '}
          <span className='font-semibold not-italic'>{list.owner}</span>
        </p>
      </div>
      <ul>
        {list.items.map((item: ListItem, idx: number) => (
          <ListDetailItem key={idx} listItem={item} />
        ))}
      </ul>
    </section>
  );
}

export default ListDetail;

import { ListItem } from '@/types/types';

import { Itim } from 'next/font/google';

const itim = Itim({ weight: '400', subsets: ['latin'] });

type ListDetailItemProps = {
  listItem: ListItem;
};

function ListDetailItem({ listItem }: ListDetailItemProps) {
  return (
    <li className='mb-4'>
      <h3 className={`${itim.className} text-lg`}>
        <span className='inline-block w-6 text-2xl font-bold'>-</span>
        {listItem.title}
      </h3>
      <p className='pl-6'>{listItem.description}</p>
      {listItem.link && listItem.link.length > 0 && (
        <a
          href={`${listItem.link}`}
          target='_blank'
          className='mt-2 pl-6 italic text-slate-600 underline'
        >
          Länk
        </a>
      )}
    </li>
  );
}

export default ListDetailItem;

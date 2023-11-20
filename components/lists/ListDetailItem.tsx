import { Itim } from 'next/font/google';
import { FaGift } from 'react-icons/fa6';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { ListItem } from '@/types/types';
import { assurePrefix } from '@/utils/lists/list-utils';

const itim = Itim({ weight: '400', subsets: ['latin'] });

type ListDetailItemProps = {
  listItem: ListItem;
};

function ListDetailItem({ listItem }: ListDetailItemProps) {
  return (
    <li className='mb-4 grid grid-cols-[40px_1fr] text-slate-900'>
      <FaGift className='col-span-1 inline-block self-center justify-self-start' />
      <span className={`${itim.className} text-lg`}>{listItem.title}</span>
      <p className='col-span-1 col-start-2'>{listItem.description}</p>
      {listItem.link && listItem.link.length > 0 && (
        <a
          href={`${assurePrefix(listItem.link)}`}
          target='_blank'
          className='col-span-1 col-start-2 mt-2 flex items-center justify-self-start p-1 italic text-slate-600 underline hover:bg-slate-200'
        >
          <FaExternalLinkAlt className='mr-4 inline-block' />
          Länk
        </a>
      )}
    </li>
  );
}

export default ListDetailItem;

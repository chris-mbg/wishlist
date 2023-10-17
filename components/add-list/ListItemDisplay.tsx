import { ListItem } from '@/types/types';
import { Itim } from 'next/font/google';

const itim = Itim({ weight: '400', subsets: ['latin'] });

type ListItemDisplayProps = {
  item: ListItem;
};

function ListItemDisplay({ item }: ListItemDisplayProps) {
  return (
    <li className=''>
      <p className={`${itim.className}`}>{item.title}</p>
      {item.description && item.description.length > 0 && (
        <p className='text-sm'>{item.description}</p>
      )}
      {item.link && item.link.length > 0 && (
        <p className='text-sm'>{item.link}</p>
      )}
    </li>
  );
}

export default ListItemDisplay;

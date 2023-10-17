import { List } from '@/types/types';
import Link from 'next/link';

import { Itim } from 'next/font/google';

const itim = Itim({ weight: '400', subsets: ['latin'] });

type ListInfoCardProps = {
  listInfo: List;
};

function ListInfoCard({ listInfo }: ListInfoCardProps) {
  return (
    <Link key={listInfo.id} href={`/lists/${listInfo.id}`}>
      <div className='m-4 cursor-pointer rounded-xl bg-gradient-to-tr from-white to-slate-100 p-6 shadow  hover:shadow-lg hover:shadow-white'>
        <h2 className={`${itim.className} text-2xl uppercase`}>
          {listInfo.title}
        </h2>
        <div className='mt-4 flex justify-between'>
          {typeof listInfo.entered === 'string' && (
            <time>{listInfo.entered}</time>
          )}
          <p className='italic'>
            Skapad av:{' '}
            <span className='font-semibold not-italic'>
              {listInfo.ownerEmail}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ListInfoCard;

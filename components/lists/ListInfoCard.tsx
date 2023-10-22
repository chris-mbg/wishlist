import { List } from '@/types/types';
import Link from 'next/link';
import { FaPen } from 'react-icons/fa6';

import { Itim } from 'next/font/google';
import { convertDateToLocaleString } from '@/utils/dateHelpers';
import { useSession } from 'next-auth/react';

const itim = Itim({ weight: '400', subsets: ['latin'] });

type ListInfoCardProps = {
  listInfo: List;
};

function ListInfoCard({ listInfo }: ListInfoCardProps) {
  const { data } = useSession();

  return (
    <Link key={listInfo._id} href={`/lists/${listInfo._id}`}>
      <div className='m-4 cursor-pointer rounded-xl bg-gradient-to-tr from-white to-slate-100 p-6 shadow  hover:shadow-lg hover:shadow-white'>
        <div className='flex justify-between'>
          <h2 className={`${itim.className} text-2xl uppercase`}>
            {listInfo.title}
          </h2>

          {data?.user?.email === listInfo.owner && (
            <Link href={`/lists/${listInfo._id}/edit`} passHref legacyBehavior>
              <span>
                <FaPen />
              </span>
            </Link>
          )}
        </div>
        <div className='mt-4 flex justify-between'>
          <time>{convertDateToLocaleString(listInfo.createdAt)}</time>
          <p className='italic'>
            Skapad av:{' '}
            <span className='font-semibold not-italic'>{listInfo.owner}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ListInfoCard;

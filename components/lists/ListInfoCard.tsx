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
      <div className='m-4 cursor-pointer rounded-xl bg-gradient-to-tr from-white to-slate-100 p-2 text-slate-900  shadow hover:to-slate-300 hover:shadow hover:shadow-white md:p-6'>
        <div className='flex justify-between'>
          <h2 className={`${itim.className} text-2xl`}>{listInfo.title}</h2>

          {data?.user?.email === listInfo.owner && (
            <Link href={`/lists/${listInfo._id}/edit`} passHref legacyBehavior>
              <span className='px-1'>
                <FaPen className=' hover:fill-red-400' size={18} />
              </span>
            </Link>
          )}
        </div>
        <div className='mt-4 flex flex-col justify-between md:flex-row'>
          <time>{convertDateToLocaleString(listInfo.createdAt)}</time>
          <p className='italic'>
            Skapad av:{' '}
            <span className='font-semibold not-italic'>
              {listInfo.owner_username ?? listInfo.owner}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ListInfoCard;

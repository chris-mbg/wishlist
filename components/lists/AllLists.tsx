import { List } from '@/types/types';
import ListInfoCard from './ListInfoCard';

import { Barlow } from 'next/font/google';

const barlow = Barlow({
  weight: ['300', '400', '500', '600', '800'],
  subsets: ['latin'],
});

type AllListsProps = {
  allLists: List[];
  heading: string;
};

function AllLists({ allLists, heading }: AllListsProps) {
  return (
    <div>
      <h1 className={`mb-6 text-center text-3xl`}>{heading}</h1>
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
        {allLists &&
          allLists.map((list) => (
            <ListInfoCard listInfo={list} key={list.id} />
          ))}
      </div>
    </div>
  );
}

export default AllLists;

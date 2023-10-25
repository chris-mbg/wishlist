import { List } from '@/types/types';
import ListInfoCard from './ListInfoCard';

type AllListsProps = {
  allLists: List[];
  heading: string;
};

function AllLists({ allLists, heading }: AllListsProps) {
  return (
    <div>
      <h1 className='page-title'>{heading}</h1>
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
        {allLists &&
          allLists.map((list) => (
            <ListInfoCard listInfo={list} key={list._id} />
          ))}
      </div>
    </div>
  );
}

export default AllLists;

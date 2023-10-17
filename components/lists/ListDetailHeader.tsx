import Link from 'next/link';
import Button from '../ui/Button';

type ListDetailHeaderProps = {
  id: string;
};

function ListDetailHeader({ id }: ListDetailHeaderProps) {
  return (
    <div className='flex justify-end'>
      <Link href={`/lists/${id}/edit`} className=''>
        <Button>Redigera</Button>
      </Link>
      <button disabled>Ta bort lista</button>
    </div>
  );
}

export default ListDetailHeader;

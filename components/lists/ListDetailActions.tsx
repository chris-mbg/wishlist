import Link from 'next/link';
import Button from '../ui/Button';

type ListDetailActionsProps = {
  id: string;
};

function ListDetailActions({ id }: ListDetailActionsProps) {
  return (
    <div className='mb-4 flex justify-end gap-4'>
      <button disabled className='p-1 font-semibold'>
        Ta bort lista
      </button>
      <Link href={`/lists/${id}/edit`} className=''>
        <Button>Redigera</Button>
      </Link>
    </div>
  );
}

export default ListDetailActions;

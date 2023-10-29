import Link from 'next/link';
import Button from '../ui/Button';
import DeleteListButton from '../edit-list/DeleteListButton';

type ListDetailActionsProps = {
  id: string;
};

function ListDetailActions({ id }: ListDetailActionsProps) {
  return (
    <div className='mb-4 flex items-center justify-end gap-4'>
      <DeleteListButton listId={id} />
      <Link href={`/lists/${id}/edit`} className=''>
        <Button onClick={() => {}}>Redigera</Button>
      </Link>
    </div>
  );
}

export default ListDetailActions;

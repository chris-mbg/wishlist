'use client';
import { useRouter } from 'next/router';

type DeleteListButtonProps = {
  listId: string;
};

// TODO Fix Modal!

function DeleteListButton({ listId }: DeleteListButtonProps) {
  const router = useRouter();
  // const { Modal, toggle } = useModal();

  const handleClick = async () => {
    if (window.confirm('Vill du verkligen ta bort listan?')) {
      const res = await fetch(`/api/lists/${listId}`, {
        method: 'DELETE',
      });
      const json = await res.json();

      if (res.ok) {
        router.push('/');
      }
    } else {
      return;
    }
  };

  return (
    <>
      <button
        className='rounded p-2 font-semibold hover:text-slate-200'
        onClick={handleClick}
      >
        Ta bort listan
      </button>
      {/* Not working as expected... */}
      {/*  <Modal>
        <p className='text-black'>Do you want to delete?</p>
      </Modal> */}
    </>
  );
}

export default DeleteListButton;

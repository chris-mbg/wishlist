import { firestore } from '@/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

type TitleFormProps = {
  listId: string;
  title: string;
};

function TitleForm({ listId, title }: TitleFormProps) {
  const [newTitle, setNewTitle] = useState<string>();

  const handleTitleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const docRef = doc(firestore, 'lists', listId);
    const result = await updateDoc(docRef, {
      title: newTitle,
    });
  };

  return (
    <form onSubmit={handleTitleSubmit}>
      <div className='my-4'>
        <label className='block'>Listans namn</label>
        <input
          type='text'
          onChange={(e) => setNewTitle(e.target.value)}
          defaultValue={title}
          className='w-full rounded bg-slate-50 p-2 text-lg outline-none'
        />
      </div>
    </form>
  );
}

export default TitleForm;

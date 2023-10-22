import { useState } from 'react';

type TitleFormProps = {
  listId: string;
  title: string;
};

function TitleForm({ listId, title }: TitleFormProps) {
  const [newTitle, setNewTitle] = useState<string>();

  const handleTitleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO Loading

    if (!newTitle || newTitle.trim() === '') {
      return;
    }

    const res = await fetch(`/api/lists/${listId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTitle }),
    });

    if (!res.ok) {
      // TODO Error message
      console.log('error saving title');
    } else {
      console.log('save new title');
      // TODO Update list data
    }
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

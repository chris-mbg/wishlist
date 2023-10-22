import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ListItem } from '@/types/types';
import ListItemForm from './ListItemForm';
import ListItemDisplay from './ListItemDisplay';

function ListForm() {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Array<Partial<ListItem>>>([]);

  const handleAddItem = (itemData: Partial<ListItem>) =>
    setItems((prevState) => [...prevState, itemData]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!titleRef.current || titleRef.current.value === '' || !items.length) {
      console.log('Not valid list');
      return;
    }
    // TODO Error message when no title and/or items
    const listData = {
      title: titleRef.current.value,
      items,
    };

    const response = await fetch('/api/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listData),
    });
    const data = await response.json();

    if (response.status === 201) {
      router.push('/user');
    }

    // TODO Error handling/ show user message
    // TODO Loading state
  };
  return (
    <form className='mx-auto md:w-3/4 lg:w-1/2' onSubmit={handleSubmit}>
      <div className='form-control'>
        <label htmlFor='list-title'>Listans namn</label>
        <input ref={titleRef} type='text' name='list-title' />
      </div>

      {items.length !== 0 && (
        <div className='my-8'>
          <h2 className='font-semibold'>Tillagda i listan</h2>
          <ul className='ml-6 mt-2 list-disc'>
            {items.map((item, idx) => (
              <ListItemDisplay key={idx} item={item} />
            ))}
          </ul>
        </div>
      )}

      <ListItemForm onSave={handleAddItem} />

      <div className='mt-6 text-center'>
        <button
          type='submit'
          className='rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700'
        >
          Spara önskelistan
        </button>
      </div>
    </form>
  );
}

export default ListForm;

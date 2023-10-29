import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ListItem } from '@/types/types';
import ListItemForm from './ListItemForm';
import ListItemDisplay from './ListItemDisplay';
import ErrorAlert from '../ui/ErrorAlert';

function ListForm() {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Array<Partial<ListItem>>>([]);
  const [error, setError] = useState('');

  const handleAddItem = (itemData: Partial<ListItem>) =>
    setItems((prevState) => [...prevState, itemData]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');

    if (!titleRef.current || titleRef.current.value === '' || !items.length) {
      setError('Listan saknar titel eller önskningar');
      return;
    }

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

    if (response.ok && response.status === 201) {
      router.push('/user');
    } else {
      setError('Kunde inte spara lista...');
    }

    // TODO Loading state
  };
  return (
    <form className='mx-auto md:w-3/4 lg:w-1/2' onSubmit={handleSubmit}>
      {error && <ErrorAlert className='my-4'>{error}</ErrorAlert>}
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

      <div className='mt-6'>
        <button
          type='submit'
          className='w-full rounded bg-red-400 px-4 py-2 text-lg font-semibold text-white hover:bg-red-500'
        >
          Spara önskelistan
        </button>
      </div>
    </form>
  );
}

export default ListForm;

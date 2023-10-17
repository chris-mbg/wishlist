import { ListItem } from '@/types/types';
import { useRef } from 'react';

type ItemFormProps = {
  item: ListItem;
  index: number;
  handleSubmit: (newListItem: ListItem, index: number) => void;
};

function ItemForm({ item, index, handleSubmit }: ItemFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const localHandleSubmit = (event: React.FormEvent) => {
    event?.preventDefault();

    handleSubmit(
      {
        title: titleRef.current?.value ?? item.title,
        link: linkRef.current?.value,
        description: descRef.current?.value,
      },
      index
    );
  };

  return (
    <form onSubmit={localHandleSubmit} className='my-6'>
      <div className=''>
        <div className='grid grid-cols-6 gap-2 '>
          <div className='col-span-4'>
            <label className='block'>Titel</label>
            <input
              type='text'
              defaultValue={item.title}
              ref={titleRef}
              className='block w-full rounded bg-slate-50 p-2 text-lg outline-none'
            />
          </div>
          <div className='col-span-2'>
            <label>Länk</label>
            <input
              type='text'
              defaultValue={item.link}
              ref={linkRef}
              className='block w-full rounded bg-slate-50 p-2 text-lg outline-none'
            />
          </div>
        </div>
        <div className='grid grid-cols-6 gap-2'>
          <div className='col-span-4'>
            <label>Beskrivning</label>
            <textarea
              rows={2}
              defaultValue={item.description}
              ref={descRef}
              className='block w-full rounded bg-slate-50 p-2 text-lg outline-none'
            ></textarea>
          </div>
          <button type='submit' className='col-span-2'>
            Spara ändringar
          </button>
        </div>
      </div>
    </form>
  );
}

export default ItemForm;

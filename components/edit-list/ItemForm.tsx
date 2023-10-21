import { ListItem } from '@/types/types';
import { useRef } from 'react';
import { FaRegCircleXmark } from 'react-icons/fa6';

type ItemFormProps = {
  item: ListItem;
  handleSubmit: (newListItem: ListItem, index: number) => void;
  closeHandler: () => void;
};

function ItemForm({ item, handleSubmit, closeHandler }: ItemFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const localHandleSubmit = (event: React.FormEvent) => {
    event?.preventDefault();

    // handleSubmit(
    //   {
    //     title: titleRef.current?.value ?? item.title,
    //     link: linkRef.current?.value,
    //     description: descRef.current?.value,
    //   },
    //   index
    // );
  };

  return (
    <form onSubmit={localHandleSubmit} className=''>
      <fieldset className='grid grid-cols-6 gap-1 border border-slate-400 p-2'>
        <div className='col-span-3'>
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
        <div className='col-span-1 row-span-2 flex flex-col items-end justify-between'>
          <FaRegCircleXmark
            onClick={closeHandler}
            size={20}
            className='cursor-pointer fill-slate-600'
          />
          <button
            type='submit'
            className='rounded-lg border border-slate-900 px-2 py-1 '
          >
            Spara
          </button>
        </div>
        <div className='col-span-5'>
          <label>Beskrivning</label>
          <textarea
            rows={2}
            defaultValue={item.description}
            ref={descRef}
            className='block w-full rounded bg-slate-50 p-2 text-lg outline-none'
          ></textarea>
        </div>
      </fieldset>
    </form>
  );
}

export default ItemForm;

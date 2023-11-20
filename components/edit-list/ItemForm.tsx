import { ListItem } from '@/types/types';
import { useRef } from 'react';
import { FaRegCircleXmark } from 'react-icons/fa6';

type ItemFormProps = {
  item: ListItem;
  handleSubmit: (newListItem: Partial<ListItem>, id: string) => void;
  closeHandler: () => void;
};

function ItemForm({ item, handleSubmit, closeHandler }: ItemFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const localHandleSubmit = (event: React.FormEvent) => {
    event?.preventDefault();

    handleSubmit(
      {
        title: titleRef.current?.value || item.title,
        link: linkRef.current?.value || '',
        description: descRef.current?.value || '',
      },
      item._id
    );
    closeHandler();
  };

  return (
    <form onSubmit={localHandleSubmit} className='mb-4'>
      <fieldset className='grid grid-cols-6 gap-1 border border-slate-400 p-2'>
        <div className='col-span-5 xl:order-1 xl:col-span-3'>
          <label className='block text-slate-50'>Titel</label>
          <input
            type='text'
            defaultValue={item.title}
            ref={titleRef}
            className='block w-full rounded bg-slate-50 p-2 text-lg outline-none'
          />
        </div>

        <FaRegCircleXmark
          onClick={closeHandler}
          size={20}
          className='inline-block cursor-pointer justify-self-end fill-slate-100 hover:fill-slate-300 xl:order-3'
        />

        <div className='col-span-5 xl:order-4'>
          <label className='text-slate-50'>Beskrivning</label>
          <textarea
            rows={2}
            defaultValue={item.description}
            ref={descRef}
            className='block w-full rounded bg-slate-50 p-2 text-lg outline-none'
          ></textarea>
        </div>
        <div className='col-span-5 xl:order-2 xl:col-span-2'>
          <label className='text-slate-50'>Länk</label>
          <input
            type='text'
            defaultValue={item.link}
            ref={linkRef}
            className='block w-full rounded bg-slate-50 p-2 text-lg outline-none'
          />
        </div>

        <button
          type='submit'
          className='col-span-1 self-end justify-self-end rounded-lg border border-slate-50 px-2 py-1 text-slate-50 hover:bg-slate-500 xl:order-5'
        >
          Spara
        </button>
      </fieldset>
    </form>
  );
}

export default ItemForm;

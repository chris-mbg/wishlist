import { ListItem } from '@/types/types';
import { useRef } from 'react';

interface ListItemFormProps {
  onSave: (item: Partial<ListItem>) => void;
}

// TODO More compact layout?

function ListItemForm(props: ListItemFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    if (!titleRef.current?.value) {
      return;
    }

    props.onSave({
      title: titleRef.current.value,
      link: linkRef.current?.value ?? '',
      description: descRef.current?.value ?? '',
    });

    titleRef.current.value = '';
    if (linkRef.current && descRef.current) {
      linkRef.current.value = '';
      descRef.current.value = '';
    }
  };

  return (
    <fieldset className='relative my-6 flex flex-col gap-4 bg-slate-300 p-4 pt-12'>
      <legend className='absolute top-2 uppercase'>
        Lägg till en sak till listan
      </legend>
      <div className='form-control'>
        <label>Vad önskar du dig?</label>
        <input
          type='text'
          ref={titleRef}
          placeholder='En grej, en bok eller något annat'
        />
      </div>
      <div className='form-control'>
        <label>Beskrivning</label>
        <textarea
          rows={2}
          className='rounded p-2'
          placeholder='Lägg till en förklaring om du vill'
          ref={descRef}
        ></textarea>
      </div>
      <div className='form-control'>
        <label>Länk</label>
        <input type='text' ref={linkRef} placeholder='Om det behövs' />
      </div>
      <button
        type='button'
        className='self-end rounded border border-gray-900 p-2 hover:bg-gray-200'
        onClick={handleSave}
      >
        + Lägg till
      </button>
    </fieldset>
  );
}

export default ListItemForm;

import { ListItem } from '@/types/types';
import { useRef } from 'react';

interface ListItemFormProps {
  onSave: (item: Partial<ListItem>) => void;
  editMode?: boolean;
}

// TODO More compact layout?

function ListItemForm({ onSave, editMode = false }: ListItemFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    if (!titleRef.current?.value) {
      return;
    }

    onSave({
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
    <fieldset className='relative my-6 flex flex-col gap-4 rounded bg-slate-200 p-4 pt-12 text-slate-900'>
      <legend className='absolute top-2 font-semibold'>
        Lägg till en sak till listan
      </legend>
      {!editMode && (
        <p className='text-sm'>
          Glöm inte att spara varje önskning innan du sparar hela listan. Men
          det går alltid att gå tillbaka och ändra och lägga till önskningar
          senare.
        </p>
      )}
      <div className='form-control'>
        <label>Vad önskar du dig?</label>
        <input
          type='text'
          ref={titleRef}
          placeholder='Alla önskningar är tillåtna'
        />
      </div>
      <div className='form-control'>
        <label>Beskrivning</label>
        <textarea
          rows={2}
          className='rounded p-2'
          placeholder='Lägg till ytterligare info om du vill'
          ref={descRef}
        ></textarea>
      </div>
      <div className='form-control'>
        <label>Länk</label>
        <input type='text' ref={linkRef} placeholder='Om det behövs..' />
      </div>
      <button
        type='button'
        className='self-end rounded border border-slate-900 p-2 text-slate-900 hover:bg-slate-300'
        onClick={handleSave}
      >
        + Lägg till önskning
      </button>
    </fieldset>
  );
}

export default ListItemForm;

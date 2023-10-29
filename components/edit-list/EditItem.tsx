import { useState } from 'react';
import { ListItem } from '@/types/types';
import ItemForm from './ItemForm';
import EditDeleteIcons from '../ui/EditDeleteIcons';

type EditItemProps = {
  item: ListItem;
  onItemFormSubmit: (updates: Partial<ListItem>, itemId: string) => void;
  onItemDelete: (itemId: string) => void;
};

function EditItem({ item, onItemFormSubmit, onItemDelete }: EditItemProps) {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <ItemForm
        item={item}
        handleSubmit={onItemFormSubmit}
        closeHandler={() => setShowForm(false)}
      />
    );
  }
  return (
    <li className='mb-4 bg-slate-50 p-6 shadow-inner shadow-slate-300'>
      <div className='flex justify-between'>
        <p className='mb-2 font-semibold'>{item.title}</p>
        <EditDeleteIcons
          onEditClick={() => setShowForm(true)}
          onDeleteClick={() => onItemDelete(item._id)}
        />
      </div>
      <div className='flex justify-between'>
        {item.description && <p>{item.description}</p>}{' '}
        {item.link && <a href={item.link} target='_blank'></a>}
      </div>
    </li>
  );
}

export default EditItem;

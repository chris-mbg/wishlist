import { FaPen, FaTrash } from 'react-icons/fa6';

type EditDeleteProps = {
  onEditClick: () => void;
  onDeleteClick: () => void;
  className?: string;
};

export default function EditDeleteIcons({
  onEditClick,
  onDeleteClick,
  className,
}: EditDeleteProps) {
  return (
    <div className={`flex gap-6 ${className}`}>
      <FaTrash
        size={18}
        className='cursor-pointer fill-slate-400 hover:fill-red-600'
        onClick={onDeleteClick}
      />
      <FaPen
        size={18}
        className='cursor-pointer fill-slate-600 hover:fill-red-300'
        onClick={onEditClick}
      />
    </div>
  );
}

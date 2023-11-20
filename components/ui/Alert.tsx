import { ReactNode } from 'react';
import { PiWarningFill } from 'react-icons/pi';
import { RiInformationLine, RiCheckboxCircleLine } from 'react-icons/ri';

type AlertProps = {
  children?: ReactNode;
  title?: string;
  className?: string;
  variant?: 'error' | 'success' | 'info';
};

function Alert({ children, title, className, variant = 'error' }: AlertProps) {
  const getColor = () => {
    switch (variant) {
      case 'success':
        return `bg-emerald-200 border-emerald-800 text-emerald-800`;
      case 'info':
        return `bg-yellow-200 border-yellow-800 text-yellow-800`;
      default:
        return ` border-red-800 bg-red-200 text-red-800 `;
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <RiCheckboxCircleLine className='block self-center' size={20} />;
      case 'info':
        return <RiInformationLine className='block self-center' size={20} />;
      default:
        return <PiWarningFill className='block self-center' size={20} />;
    }
  };

  return (
    <div
      className={`mx-auto border p-2 text-center ${getColor()} ${
        className ?? ''
      }`}
    >
      <p className='flex place-content-center gap-4 font-semibold'>
        {getIcon()}
        {title ?? 'Någonting gick fel'}
      </p>
      {children && (
        <p>
          <small>{children}</small>
        </p>
      )}
    </div>
  );
}

export default Alert;

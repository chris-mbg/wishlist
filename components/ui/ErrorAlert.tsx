import { ReactNode } from 'react';
import { PiWarningFill } from 'react-icons/pi';

type ErrorAlertProps = {
  children?: ReactNode;
  title?: string;
  className?: string;
};

function ErrorAlert({ children, title, className }: ErrorAlertProps) {
  return (
    <div
      className={`mx-auto border border-red-800 bg-red-200 p-2 text-center text-red-800 ${
        className ?? ''
      }`}
    >
      <p className='flex place-content-center gap-4 font-semibold'>
        <PiWarningFill className='block self-center' size={20} />
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

export default ErrorAlert;

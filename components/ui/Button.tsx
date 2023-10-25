import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

function Button({ children, type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      className='rounded bg-red-400 px-3 py-2 font-semibold text-white hover:bg-red-500'
    >
      {children}
    </button>
  );
}

export default Button;

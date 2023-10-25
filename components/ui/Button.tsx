import { ReactNode } from 'react';

type ButtonProps = {
  className: string;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick: () => void;
};

function Button({
  children,
  type = 'button',
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`flex items-center justify-center gap-2 rounded bg-red-400 px-3 py-2 font-semibold text-white hover:bg-red-500 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

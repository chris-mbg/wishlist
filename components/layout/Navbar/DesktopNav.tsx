import { ReactNode } from 'react';

export type NavProps = {
  children: ReactNode;
};

function DesktopNav({ children }: NavProps) {
  return (
    <nav>
      <div className='flex items-center gap-4 text-white'>{children}</div>
    </nav>
  );
}

export default DesktopNav;

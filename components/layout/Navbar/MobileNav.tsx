import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { NavProps } from './DesktopNav';

export default function MobileNav({ children }: NavProps) {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <>
      <button onClick={() => setShowLinks((prev) => !prev)}>
        {showLinks ? <FaRegCircleXmark size={28} /> : <MdMenu size={28} />}
      </button>
      {showLinks && (
        <div className='absolute left-0 right-0 top-[100%] bg-gradient-to-tr from-cyan-400 via-cyan-500 to-cyan-700 p-4'>
          <nav className='flex flex-col items-end gap-2'>{children}</nav>
        </div>
      )}
    </>
  );
}

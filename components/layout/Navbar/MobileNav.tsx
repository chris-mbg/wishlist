import { useEffect, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { NavProps } from './DesktopNav';

export default function MobileNav({ children }: NavProps) {
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    const clickHandler = () => {
      setTimeout(() => setShowLinks(false), 100);
    };

    window.addEventListener('click', clickHandler);

    return () => window.removeEventListener('click', clickHandler);
  }, []);

  const handleToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowLinks((prev) => !prev);
  };

  return (
    <>
      <button onClick={handleToggleClick} id='mobileNavToggle'>
        {showLinks ? <FaRegCircleXmark size={28} /> : <MdMenu size={28} />}
      </button>
      {showLinks && (
        <div className='fixed left-0 right-0 top-[100%] z-10 bg-gradient-to-tr from-cyan-500 via-cyan-600 to-cyan-700 p-4'>
          <nav className='flex flex-col items-end gap-4'>{children}</nav>
        </div>
      )}
    </>
  );
}

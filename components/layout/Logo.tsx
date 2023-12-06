import Link from 'next/link';
import { Abril_Fatface } from 'next/font/google';

const logoFont = Abril_Fatface({ weight: '400', subsets: ['latin'] });

function Logo() {
  return (
    <Link href='/' className={`text-2xl lg:text-4xl ${logoFont.className}`}>
      <span className='hidden md:inline'>wishlist.</span>
      <span className='text-3xl md:hidden'>w.</span>
    </Link>
  );
}

export default Logo;

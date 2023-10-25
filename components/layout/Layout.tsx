import Navbar from './Navbar/Navbar';
import { Barlow } from 'next/font/google';

const barlow = Barlow({
  weight: ['300', '400', '500', '600', '800'],
  subsets: ['latin'],
});

function Layout(props: any) {
  return (
    <>
      <Navbar />
      <main className={`p-4 md:p-8 lg:p-12 ${barlow.className}`}>
        {props.children}
      </main>
    </>
  );
}

export default Layout;

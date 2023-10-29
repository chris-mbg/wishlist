import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='relative min-h-screen bg-cyan-900 text-white'>
        <Main />
        {/* <div id='modal-root'></div> */}
        <NextScript />
      </body>
    </Html>
  );
}

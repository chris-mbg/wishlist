import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

const GoogleButton = () => {
  return (
    <button
      type='button'
      onClick={() => signIn('google', { callbackUrl: '/' })}
      className='my-4 flex cursor-pointer items-center gap-12 rounded-lg bg-slate-100  px-8 py-4 font-semibold text-slate-900 hover:bg-slate-200'
    >
      <FcGoogle size={20} className='align-text-top' />
      <span className='whitespace-nowrap'>Logga in med Google</span>
      <span></span>
    </button>
  );
};

export default GoogleButton;

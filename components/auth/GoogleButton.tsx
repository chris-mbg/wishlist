import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

const GoogleButton = () => {
  return (
    <button
      type='button'
      onClick={() => signIn('google', { callbackUrl: '/' })}
      className='my-4 flex w-96 cursor-pointer items-center justify-between rounded-lg bg-[#EAECEF]  py-2 pl-4 text-center hover:bg-[#F5F5F5]  sm:py-4'
    >
      <FcGoogle size={20} className='align-text-top' />
      <span>Fortsätt med Google</span>
      <span></span>
    </button>
  );
};

export default GoogleButton;

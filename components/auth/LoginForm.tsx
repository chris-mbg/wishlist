import { FormEvent, useRef } from 'react';

type LoginFormProps = {
  onSubmit: (email: string, pwd: string) => void;
};

function LoginForm({ onSubmit }: LoginFormProps) {
  const email = useRef<HTMLInputElement>(null);
  const pwd = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.current?.value || !pwd.current?.value) {
      return;
    }

    onSubmit(email.current.value, pwd.current.value);
  };

  return (
    <div>
      <form
        className='m-4 mx-auto flex flex-col gap-8 md:w-4/5 lg:w-3/5'
        onSubmit={handleSubmit}
      >
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            ref={email}
            required
            placeholder='mail@mail.com'
          />
        </div>
        <div className='form-control'>
          <label htmlFor='pwd'>Lösenord</label>
          <input
            type='password'
            id='pwd'
            ref={pwd}
            required
            placeholder='******'
          />
        </div>
        <button
          type='submit'
          className='rounded bg-red-400 px-4 py-2 text-lg font-semibold text-white hover:bg-red-500'
        >
          Logga in
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

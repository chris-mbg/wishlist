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
      <h1 className='page-title'>Logga in</h1>
      <form
        className='m-10 mx-auto flex w-4/5 flex-col gap-8 lg:w-3/5'
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
          className='rounded bg-slate-800 p-2 text-white hover:shadow hover:shadow-white'
        >
          Logga in
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

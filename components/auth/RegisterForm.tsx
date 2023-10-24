import { useRouter } from 'next/router';
import { FormEvent, useRef, useState } from 'react';

function RegisterForm() {
  const router = useRouter();

  const email = useRef<HTMLInputElement>(null);
  const pwd = useRef<HTMLInputElement>(null);
  const userName = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (
      !email.current?.value ||
      !pwd.current?.value ||
      !userName.current?.value
    ) {
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.current.value,
          password: pwd.current.value,
          userName: userName.current.value,
        }),
      });

      if (!res.ok) {
        setError('Could not save user');
      }

      if (res.status === 201) {
        router.push('/login');
      }
    } catch (err: any) {
      setError(err.message || 'Could not save user');
    }
  };

  return (
    <div>
      <h1 className='page-title'>Registrera dig</h1>
      {error && (
        <div className='mx-auto border border-red-800 bg-red-200 p-2 text-center text-red-800 md:w-4/5 lg:w-3/5'>
          <p className='font-semibold'>Något gick fel...</p>
          <p>
            <small>{error}</small>
          </p>
        </div>
      )}
      <form
        className='m-10 mx-auto flex flex-col gap-8 md:w-4/5 lg:w-3/5'
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
          <label htmlFor='userName'>Användarnamn</label>
          <input
            type='text'
            id='userName'
            ref={userName}
            required
            placeholder='Ditt namn'
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
          Registrera
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;

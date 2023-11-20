import { useRouter } from 'next/router';
import { FormEvent, useRef, useState } from 'react';
import ErrorAlert from '../ui/Alert';

function RegisterForm() {
  const router = useRouter();

  const email = useRef<HTMLInputElement>(null);
  const pwd = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (
      !email.current?.value ||
      !pwd.current?.value ||
      !username.current?.value
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
          username: username.current.value,
        }),
      });

      if (!res.ok) {
        setError('Could not save user');
      }

      if (res.status === 201) {
        router.push('/login?new-user=true');
      }
    } catch (err: any) {
      setError(err.message || 'Could not save user');
    }
  };

  return (
    <div>
      <h1 className='page-title'>Registrera dig</h1>
      {error && <ErrorAlert className='md:w-4/5 lg:w-3/5 '>{error}</ErrorAlert>}
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
          <label htmlFor='username'>Användarnamn</label>
          <input
            type='text'
            id='username'
            ref={username}
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
          className='rounded bg-red-400 px-4 py-2 text-lg font-semibold text-white hover:bg-red-500'
        >
          Registrera
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;

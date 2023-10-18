import { useRouter } from 'next/router';
import { FormEvent, useRef } from 'react';

function RegisterForm() {
  const router = useRouter();

  const email = useRef<HTMLInputElement>(null);
  const pwd = useRef<HTMLInputElement>(null);
  const userName = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

      if (res.status === 201) {
        router.push('/login');
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <h1 className='page-title'>Registrera dig</h1>
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

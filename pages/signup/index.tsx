import signUp from "@/firebase/auth/signup"
import { useRouter } from "next/router"
import { FormEvent, useRef } from "react"

export default function SignupPage() {
  const router = useRouter()

  const email = useRef<HTMLInputElement>(null)
  const pwd = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.current?.value || !pwd.current?.value) {
      return
    }
    const { result, error } = await signUp(
      email.current.value,
      pwd.current.value
    )

    if (error) {
      console.log(error)
    }

    console.log(result)
  }

  return (
    <div>
      <h1>Sign up</h1>
      <form className="flex flex-col m-10 gap-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            ref={email}
            required
            className="border border-slate-900"
          />
        </div>
        <div>
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            id="pwd"
            ref={pwd}
            required
            className="border border-slate-900"
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-slate-900 text-white rounded hover:bg-slate-700"
        >
          Sign up
        </button>
      </form>
    </div>
  )
}

import signIn from "@/firebase/auth/signin"
import { useRouter } from "next/router"
import { useRef } from "react"

function LoginPage() {
  const router = useRouter()

  const email = useRef<HTMLInputElement>(null)
  const pwd = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.current?.value || !pwd.current?.value) {
      return
    }
    const { result, error } = await signIn(
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
      <h1>Login</h1>
      <form className="flex flex-col m-10 gap-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            ref={email}
            required
            className="border border-gray-900"
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
          className="p-2 bg-gray-900 text-white rounded hover:bg-gray-700"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage

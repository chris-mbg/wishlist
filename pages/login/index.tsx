import signIn from "@/firebase/auth/signin"
import { useRouter } from "next/router"
import { useRef } from "react"

function LoginPage() {
  const router = useRouter()

  const email = useRef<HTMLInputElement>(null)
  const pwd = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    router.push({
      pathname: "/",
    })
  }

  return (
    <div className="md:w-3/4 lg:w-1/2 mx-auto p-8">
      <h1 className="text-center text-2xl">Logga in</h1>
      <form className="flex flex-col m-10 gap-8" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="mail@mail.com"
            ref={email}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="pwd">Lösenord</label>
          <input
            type="password"
            id="pwd"
            ref={pwd}
            placeholder="******"
            required
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-gray-900 text-white rounded hover:bg-gray-700"
        >
          Logga in
        </button>
      </form>
    </div>
  )
}

export default LoginPage

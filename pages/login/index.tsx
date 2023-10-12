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
    <div className="w-3/4 lg:w-1/2 mx-auto p-8">
      <h1 className="text-center text-2xl">Logga in</h1>
      <form className="flex flex-col m-10 gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <label htmlFor="email" className="text-lg">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            placeholder="mail@mail.com"
            ref={email}
            required
            className="outline-none border-b border-gray-900 col-span-4 text-lg p-2 pb-0"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="pwd" className="text-lg">
            Lösenord
          </label>
          <input
            type="password"
            id="pwd"
            ref={pwd}
            placeholder="******"
            required
            className="outline-none border-b border-gray-900 col-span-4 text-lg p-2 pb-0"
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

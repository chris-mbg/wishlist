import { getAuth, User } from "firebase/auth"
import { auth } from "@/firebase/config"
import { createContext, useContext, useEffect, useState } from "react"
import nookies from "nookies"

export const AuthContext = createContext<{ user: User | null }>({
  user: null,
})

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    return auth.onIdTokenChanged(async user => {
      if (!user) {
        setUser(null)
        nookies.set(undefined, "token", "", { path: "/" })
      } else {
        const token = await user.getIdToken()
        setUser(user)
        nookies.set(undefined, "token", token, { path: "/" })
      }
    })
  }, [])

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)

    return () => clearInterval(handle)
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

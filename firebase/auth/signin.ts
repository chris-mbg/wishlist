import { auth } from "../config"
import { signInWithEmailAndPassword } from "firebase/auth"

export default async function signIn(email: string, password: string) {
  let result = null
  let error = null

  try {
    result = await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    error = err
  }

  console.log("current user", auth.currentUser)

  return { result, error }
}

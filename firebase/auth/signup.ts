import { auth } from "../config"
import { createUserWithEmailAndPassword } from "firebase/auth"

export default async function signUp(email: string, password: string) {
  let result = null
  let error = null

  try {
    result = await createUserWithEmailAndPassword(auth, email, password)
  } catch (err) {
    error = err
  }

  return { result, error }
}

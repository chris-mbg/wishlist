import firebase_app from "../config"
import { getAuth } from "firebase/auth"

const auth = getAuth(firebase_app)

export default async function signOut() {
  let result = null
  let error = null

  try {
    result = await auth.signOut()
  } catch (err) {
    error = err
  }

  return { result, error }
}

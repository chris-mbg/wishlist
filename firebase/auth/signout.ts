import { auth } from "../config"

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

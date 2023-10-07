import signOut from "@/firebase/auth/signout"
import { firebaseAdmin } from "@/firebase/firebaseAdmin"
import { getAuth } from "firebase-admin/auth"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"
import nookies from "nookies"

function TestPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter()

  const handleSignout = async () => {
    await signOut()
    router.push("/")
  }
  return (
    <>
      <h1>Auth test</h1>
      <button onClick={handleSignout}>Sign out</button>
    </>
  )
}

export default TestPage

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const cookies = nookies.get(ctx)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)

    const { uid, email } = token

    console.log("Authenticated")

    return {
      props: {
        message: "User OK",
      },
    }
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destinaion: "/login",
      },
      props: {} as never,
    }
  }
}

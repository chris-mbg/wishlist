import { GetServerSidePropsContext } from "next"
import nookies from "nookies"
import { firebaseAdmin } from "@/firebase/firebaseAdmin"
import ListForm from "@/components/add-list/ListForm"

function NewListPage() {
  return (
    <>
      <h1 className="text-center my-6 font-bold text-xl">
        Skapa en ny önskelista
      </h1>
      <ListForm />
    </>
  )
}

export default NewListPage

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const cookies = nookies.get(ctx)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)

    const { uid, email } = token

    return {
      props: {
        message: "User authenticated",
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

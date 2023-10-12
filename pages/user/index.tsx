import { firebaseAdmin } from "@/firebase/firebaseAdmin"
import { index } from "@/firebase/helpers/lists"
import { List } from "@/types/types"
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next"
import nookies from "nookies"

function UserPage({ lists }: InferGetServerSidePropsType<GetServerSideProps>) {
  return <>{JSON.stringify(lists)}</>
}

export default UserPage

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  let userId: string

  try {
    const cookies = nookies.get(context)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    userId = token.uid
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    }
  }

  let result: List[] = []

  try {
    result = await index(userId)
  } catch (err) {
    console.error("Error getting lists...", err)
  }

  return {
    props: {
      lists: result,
    },
  }
}) satisfies GetServerSideProps<{
  lists: List[]
}>

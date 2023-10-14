import TitleForm from "@/components/edit-list/TitleForm"
import { firestore } from "@/firebase/config"
import { firebaseAdmin } from "@/firebase/firebaseAdmin"
import { getOne } from "@/firebase/helpers/list"
import { List, ListItem } from "@/types/types"
import { doc, onSnapshot } from "firebase/firestore"
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next"
import nookies from "nookies"
import { useEffect, useState } from "react"

function EditPage({ list }: InferGetServerSidePropsType<GetServerSideProps>) {
  const [localList, setLocalList] = useState<List>(list)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firestore, "lists", localList.id),
      doc => {
        console.log("new snapshot", doc.data())
        setLocalList({ id: doc.id, ...doc.data() })
      }
    )
    return unsubscribe
  }, [])

  return (
    <div>
      <h1>Ändra {localList.title}</h1>

      <TitleForm listId={localList.id} title={localList.title} />

      {list.items.map((item: ListItem) => (
        <li key={item.title}>{item.title}</li>
      ))}
    </div>
  )
}

export default EditPage

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  let userId: string
  const { listId } = context.params!

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

  let result: List | undefined

  try {
    result = await getOne(listId)
  } catch (err) {
    console.error("Error getting list...", err)
  }

  if (!result) {
    return {
      notFound: true,
    }
  }

  if (result.ownerId !== userId) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }

  return {
    props: {
      list: result,
    },
  }
}) satisfies GetServerSideProps<{
  list: List
}>

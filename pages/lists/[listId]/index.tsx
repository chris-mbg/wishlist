import { useAuthContext } from "@/contexts/AuthContext"
import { getOne } from "@/firebase/helpers/list"
import { index } from "@/firebase/helpers/lists"
import { List, ListItem } from "@/types/types"
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import Link from "next/link"

function ListDetailPage({ list }: InferGetStaticPropsType<GetStaticProps>) {
  const { user } = useAuthContext()

  return (
    <div className="mx-auto w-4/5 p-12">
      <h1 className="text-3xl text-center mb-4">{list.title}</h1>
      <div className="text-right">
        <p>{list.ownerEmail}</p>
        <time>{list.entered}</time>
      </div>
      <ul>
        {list.items.map((item: ListItem, idx: number) => (
          <li key={idx}>
            {item.title} - {item.description} - <a>{item.link}</a>
          </li>
        ))}
      </ul>

      {user && user.uid === list.ownerId ? (
        <Link
          href={`/lists/${list.id}/edit`}
          className="bg-gray-800 text-white p-4 mt-10"
        >
          Ändra
        </Link>
      ) : (
        ""
      )}
    </div>
  )
}

export default ListDetailPage

export const getStaticPaths = (async () => {
  let result

  try {
    result = await index()
  } catch (err) {
    console.error("Error getting lists...")
  }

  if (!result) {
    return { paths: [], fallback: true }
  }
  const paramsArray = result.map(list => ({ params: { listId: list.id } }))
  return {
    paths: paramsArray,
    fallback: "blocking",
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async (
  context: GetStaticPropsContext<{ listId: string }>
) => {
  const { listId } = context.params!

  let result: List | undefined
  try {
    result = await getOne(listId)
  } catch (err) {
    console.log("Error fetching list", err)
  }

  if (!result) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      list: result,
    },
    revalidate: 60,
  }
}) satisfies GetStaticProps<{ list: List }>

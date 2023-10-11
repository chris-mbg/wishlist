import { getOne } from "@/firebase/helpers/list"
import { index } from "@/firebase/helpers/lists"
import { List } from "@/types/types"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"

function ListDetailPage({
  list,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>Hello let me present list</h1>
      {JSON.stringify(list)}
      <h1 className="text-3xl">{list.title}</h1>
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
    fallback: false,
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async context => {
  const { listId } = context.params

  let result
  try {
    result = await getOne(listId)
  } catch (err) {
    console.log("Error fetching list", err)
  }

  return {
    props: {
      list: result,
    },
    revalidate: 60,
  }
}) satisfies GetStaticProps<{ list: List }>

import AllLists from "@/components/lists/AllLists"
import { index } from "@/firebase/helpers/lists"
import { List } from "@/types/types"
import { GetStaticProps, InferGetStaticPropsType } from "next"

export default function Home({
  allLists,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <AllLists allLists={allLists} heading="Alla önskelistor" />
}

export const getStaticProps = (async () => {
  let result: List[] = []

  try {
    result = await index()
  } catch (err) {
    console.error("Error getting lists...")
  }

  return {
    props: {
      allLists: result,
    },
    revalidate: 60,
  }
}) satisfies GetStaticProps<{
  allLists: List[]
}>

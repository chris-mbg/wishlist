import AllLists from "@/components/lists/AllLists"
import { index } from "@/firebase/helpers/lists"
import { List } from "@/types/types"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Home({
  allLists,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className={`min-h-screen p-24 ${inter.className}`}>
      <AllLists allLists={allLists} />
    </main>
  )
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

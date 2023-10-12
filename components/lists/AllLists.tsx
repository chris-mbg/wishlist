import { List } from "@/types/types"
import Link from "next/link"

type AllListsProps = {
  allLists: List[]
}

function AllLists({ allLists }: AllListsProps) {
  return (
    <div>
      <h1 className="text-center text-2xl">Alla önskelistor</h1>
      {allLists &&
        allLists.map(list => (
          <Link key={list.id} href={`/lists/${list.id}`}>
            <div className="p-6 bg-gradient-to-tr from-gray-100 to-gray-200 m-4 rounded shadow hover:to-gray-300 cursor-pointer">
              <h2>{list.title}</h2>
              <p>{list.ownerEmail}</p>
              {typeof list.entered === "string" && <time>{list.entered}</time>}
            </div>
          </Link>
        ))}
    </div>
  )
}

export default AllLists

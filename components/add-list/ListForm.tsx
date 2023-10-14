import { ListItem } from "@/types/types"
import { useRef, useState } from "react"
import ListItemForm from "./ListItemForm"
import { useAuthContext } from "@/contexts/AuthContext"

function ListForm() {
  const { user } = useAuthContext()
  const titleRef = useRef<HTMLInputElement>(null)
  const [items, setItems] = useState<Array<ListItem>>([])

  const handleAddItem = (itemData: ListItem) => {
    console.log(itemData)
    setItems(prevState => [...prevState, itemData])
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!titleRef.current || titleRef.current.value === "" || !items.length) {
      console.log("Not valid list")
      return
    }

    const listData = {
      title: titleRef.current.value,
      items,
      ownerId: user?.uid,
      ownerEmail: user?.email,
    }

    const response = await fetch("/api/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listData),
    })
    const data = await response.json()

    console.log("RESPONSE", data)
  }
  return (
    <form className="md:w-3/4 lg:w-1/2 mx-auto" onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="list-title">Listans namn</label>
        <input ref={titleRef} type="text" name="list-title" />
      </div>

      {items.length !== 0 && (
        <ul className="list-disc ml-8">
          {items.map((item, idx) => (
            <li key={idx} className="my-2">
              {item.title} - {item.description}
            </li>
          ))}
        </ul>
      )}

      <ListItemForm onSave={handleAddItem} />

      <div className="text-center mt-6">
        <button
          type="submit"
          className="rounded bg-gray-900 text-white py-2 px-4 hover:bg-gray-700"
        >
          Spara önskelista
        </button>
      </div>
    </form>
  )
}

export default ListForm

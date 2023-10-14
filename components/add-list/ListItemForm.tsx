import { ListItem } from "@/types/types"
import { useRef } from "react"

interface ListItemFormProps {
  onSave: (item: ListItem) => void
}

function ListItemForm(props: ListItemFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const linkRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLTextAreaElement>(null)

  const handleSave = () => {
    if (!titleRef.current?.value) {
      return
    }

    props.onSave({
      title: titleRef.current.value,
      link: linkRef.current?.value ?? "",
      description: descRef.current?.value ?? "",
    })

    titleRef.current.value = ""
    if (linkRef.current && descRef.current) {
      linkRef.current.value = ""
      descRef.current.value = ""
    }
  }

  return (
    <fieldset className="border border-gray-900 p-4 my-6 flex flex-col gap-4">
      <legend>Lägg till en sak på listan</legend>
      <div className="form-control">
        <label>Vad önskar du dig?</label>
        <input type="text" ref={titleRef} placeholder="" />
      </div>
      <div className="form-control">
        <label>Länk</label>
        <input type="text" ref={linkRef} placeholder="" />
      </div>
      <div className="form-control">
        <label>Beskrivning</label>
        <textarea
          rows={4}
          className="border border-gray-900 rounded p-2"
          placeholder="Lägg till en förklaring om du vill"
          ref={descRef}
        ></textarea>
      </div>
      <button
        type="button"
        className="self-end border p-2 rounded border-gray-900 hover:bg-gray-200"
        onClick={handleSave}
      >
        + Lägg till
      </button>
    </fieldset>
  )
}

export default ListItemForm

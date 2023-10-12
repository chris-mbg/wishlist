import { collection, doc, getDoc } from "firebase/firestore"
import { firestore } from "../config"
import { List } from "@/types/types"

export async function getOne(id: string): Promise<List> {
  let list = {}

  try {
    const docRef = doc(collection(firestore, "lists"), id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      list = {
        id,
        ...docSnap.data(),
        entered: new Date(
          docSnap.data().entered.seconds * 1000
        ).toLocaleDateString("sv-SE", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      } as List
    }
  } catch (err) {
    console.log("Error fetching list")
  }

  return list
}

export async function update(id: string, updates: object) {}

export async function destroy(id: string) {}

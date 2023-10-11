import { ListComplete, ListCreateData, ListOverview } from "@/types/types"
import { firestore } from "../config"
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore"

export async function store(data: ListCreateData) {
  const { title, items, ownerId, ownerEmail } = data

  const collectionRef = collection(firestore, "lists")
  const docRef = await addDoc(collectionRef, {
    title,
    items,
    ownerEmail,
    ownerId,
    entered: serverTimestamp(),
  })

  return { docRef }
}

export async function index(): Promise<ListComplete[]> {
  const querySnapshot = await getDocs(collection(firestore, "lists"))

  const lists: any[] = []
  querySnapshot.forEach(doc => {
    const list = doc.data()

    lists.push({
      id: doc.id,
      ...list,
      entered: new Date(list.entered.seconds * 1000).toLocaleDateString(
        "sv-SE",
        { weekday: "long", year: "numeric", month: "long", day: "numeric" }
      ),
    })
  })

  return lists
}

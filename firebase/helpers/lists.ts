import { List, ListCreateData } from "@/types/types"
import { firestore } from "../config"
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
  where,
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

export async function index(userId: string | null = null): Promise<List[]> {
  const q = userId
    ? query(
        collection(firestore, "lists"),
        where("ownerId", "==", userId),
        orderBy("entered", "desc")
      )
    : query(collection(firestore, "lists"), orderBy("entered", "desc"))

  const querySnapshot = await getDocs(q)

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

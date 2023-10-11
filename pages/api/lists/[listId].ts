import { getOne } from "@/firebase/helpers/list"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { listId } = req.query

  if (req.method === "GET") {
    try {
      const result = await getOne(listId as string)

      return res.status(200).json({ message: "Success", data: result })
    } catch (err) {
      return res.status(500).json({ message: "Fetching list failed" })
    }
  }
}

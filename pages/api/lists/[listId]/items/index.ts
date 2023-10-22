import List from '@/models/List';
import { RequestWithBody } from '@/types/types';
import dbConnect from '@/utils/dbConnect';
import { NextApiResponse } from 'next';

export default async function handler(
  req: RequestWithBody,
  res: NextApiResponse
) {
  const { listId } = req.query;

  if (req.method !== 'POST') {
    return;
  }

  try {
    await dbConnect();

    const parentDoc = await List.findById(listId);

    parentDoc.items.push(req.body);
    await parentDoc.save();

    return res.status(201).json({ message: 'Item has been added' });
  } catch (err) {
    res.status(500).json({ message: 'Could not add item' });
    return;
  }
}

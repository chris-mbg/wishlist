// api/lists/{listID}/items/{itemId}

import { NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import List from '@/models/List';
import { RequestWithBody } from '@/types/types';
import dbConnect from '@/utils/dbConnect';

export default async function handler(
  req: RequestWithBody,
  res: NextApiResponse
) {
  const session = getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  const { listId, itemId } = req.query;

  let parentDoc;
  let subDoc;

  try {
    await dbConnect();
    parentDoc = await List.findById(listId);
    subDoc = parentDoc.items.id(itemId);
  } catch (err) {
    res.status(500).json({ message: 'Error connecting to db...' });
    return;
  }

  if (!subDoc || !parentDoc) {
    res.status(500).json({ message: 'Could not find item' });
    return;
  }

  if (req.method === 'PUT') {
    const { title, link, description } = req.body;

    subDoc.title = title;
    subDoc.link = link;
    subDoc.description = description;

    await parentDoc.save();

    res.status(200).json({ message: 'Item saved' });
  }

  if (req.method === 'DELETE') {
    subDoc.deleteOne();

    await parentDoc.save();

    res.status(204).send({});
  }
}

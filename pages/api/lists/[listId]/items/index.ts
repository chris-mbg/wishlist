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
  const { listId } = req.query;

  if (req.method !== 'POST') {
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    await dbConnect();

    const parentDoc = await List.findById(listId);

    if (parentDoc.owner !== session.user.email) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    parentDoc.items.push(req.body);
    await parentDoc.save();

    return res.status(201).json({ message: 'Item has been added' });
  } catch (err) {
    res.status(500).json({ message: 'Could not add item' });
    return;
  }
}

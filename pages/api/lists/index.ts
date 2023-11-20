import type { NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import List from '@/models/List';
import { ListCreateData, RequestWithBody } from '@/types/types';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: RequestWithBody<ListCreateData>,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const { title, items } = req.body;

    if (title.trim() === '' || !items.length) {
      res.status(422).json({ message: 'Invalid' });
      return;
    }

    const newList = new List({
      title,
      items,
      owner: session.user?.email,
      owner_username: session.user?.username,
    });

    try {
      await newList.save();

      res.status(201).json({ message: 'List successfully created' });
      return;
    } catch (err) {
      res.status(500).json({ message: 'Saving list failed' });
      return;
    }
  }

  if (req.method === 'GET') {
    try {
      const result = await List.find({}).exec();
      res.status(200).json({ message: 'Fetched lists', data: result });
    } catch (err) {
      res.status(500).json({ message: 'Fetching lists failed' });
    }
  }
}

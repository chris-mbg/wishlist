import { NextApiRequest, NextApiResponse } from 'next';
import { getOneList } from '@/utils/lists/list-utils';
import dbConnect from '@/utils/dbConnect';
import List from '@/models/List';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { listId } = req.query;

  if (req.method === 'GET') {
    const { result, error } = await getOneList(listId as string);

    if (error) {
      return res.status(500).json({ message: 'Fetching list failed' });
    }

    return res.status(200).json({ message: 'Success', data: result });
  }

  if (req.method === 'PATCH') {
    // TODO functionality to update title
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res.status(422).json({ message: 'Not valid' });
    }

    try {
      await dbConnect();
      const doc = await List.findByIdAndUpdate(listId, { title }).exec();
      return res.status(200).json({ message: 'Success', data: doc });
    } catch (err) {
      return res.status(500).json({ message: 'Could not save update' });
    }
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import { getOneList } from '@/utils/lists/list-utils';
import dbConnect from '@/utils/dbConnect';
import List from '@/models/List';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { ListItem } from '@/types/types';

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

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  if (req.method === 'PATCH') {
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res.status(422).json({ message: 'Not valid' });
    }

    try {
      await dbConnect();
      const doc = await List.findByIdAndUpdate(
        listId,
        { title },
        { owner: session?.user.email }
      ).exec();

      return res.status(200).json({ message: 'Success', data: doc });
    } catch (err) {
      return res.status(500).json({ message: 'Could not save update' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await dbConnect();
      const doc = await List.findOne({
        _id: listId,
        owner: session.user.email,
      })
        .populate('items')
        .exec();

      if (!doc) {
        return res.status(400).json({ message: 'Could not find document' });
      }

      doc.items.forEach(async (item: any) => await item.deleteOne());

      const result = await List.findOneAndDelete({
        _id: listId,
        owner: session.user.email,
      }).exec();

      return res.status(200).json({ message: 'List deleted' });
    } catch (err) {
      return res.status(500).json({ message: 'Could not delete list' });
    }
  }
}

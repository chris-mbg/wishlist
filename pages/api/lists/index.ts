import type { NextApiResponse } from 'next';
import { ListCreateData, RequestWithBody } from '@/types/types';
import { index, store } from '@/firebase/helpers/lists';
import nookies from 'nookies';
import { firebaseAdmin } from '@/firebase/firebaseAdmin';

export default async function handler(
  req: RequestWithBody<ListCreateData>,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const cookies = nookies.get({ req });
      console.log(cookies);
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    } catch (err) {
      res.status(401).json({ message: 'Not authenticated' });
    }

    const { title, items, ownerId, ownerEmail } = req.body;

    // console.log('Request auth', req);

    if (title.trim() === '' || !items.length || !ownerId || !ownerEmail) {
      res.status(422).json({ message: 'Invalid' });
    }

    try {
      await store(req.body);

      return res.status(201).json({ message: 'List successfully created' });
    } catch (err) {
      return res.status(500).json({ message: 'Saving list failed' });
    }
  }

  if (req.method === 'GET') {
    try {
      const result = await index();
      res.status(200).json({ message: 'Fetched lists', data: result });
    } catch (err) {
      return res.status(500).json({ message: 'Fetching lists failed' });
    }
  }
}

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.status(200).json({ name: 'John Doe' });
  }
  if (req.method === 'POST') {
    res.status(200).json({ name: 'success' });
  }
}

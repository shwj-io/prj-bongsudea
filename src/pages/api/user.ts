// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@/utils/createClient';
import type { NextApiRequest, NextApiResponse } from 'next';
// import { redirect } from 'next/dist/server/api-utils';
import { redirect } from 'next/navigation';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('req ================', req.query);
  // console.log('reqeust query', req.query);
  // console.log('reqeust query', req.headers);
  const supabase = createClient();

  const session = await supabase.auth.getUser(req.query.access_token);
  console.log('session =============', session);

  // supabase.auth
  //   .getUser()
  //   .then(user => {
  //     console.log('user @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', user);
  //     return res.status(200).json({ message: user });
  //   })
  //   .catch(error => {
  //     return res.status(500).json({ error: error.message });
  //   });

  res.status(200).json({ name: 'John Doe' });
}

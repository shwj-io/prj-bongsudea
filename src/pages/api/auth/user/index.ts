import createClient from '@/utils/createClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = req.cookies;
  console.log('cookies', cookies);
  const supabase = createClient(req, res);
  try {
    const { data, error } = await supabase.auth.getUser();
    // const { data, error } = await supabase.auth.signInWithIdToken({
    //   provider: 'google',
    //   token: code,
    // });

    // if (error) throw error;

    if (data) {
      // res.redirect('http://localhost:3000');
      // res.status(200).json({
      //   data: data,
      //   message: '로그인 성공했습니다.',
      //   status: 200,
      // });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error, message: '로그인 실패했습니다.', status: 400 });
  }
}

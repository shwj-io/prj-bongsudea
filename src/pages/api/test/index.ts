import { createClient } from '@/utils/createClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;
  console.log('query', req.query);
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    // const { data, error } = await supabase.auth.signInWithIdToken({
    //   provider: 'google',
    //   token: code,
    // });

    // if (error) throw error;

    res.status(200).json({
      data: data,
      message: '로그인 성공했습니다.',
      status: 200,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error, message: '로그인 실패했습니다.', status: 400 });
  }
}

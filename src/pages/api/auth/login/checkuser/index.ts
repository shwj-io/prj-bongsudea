import { createClient } from '@/utils/createClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, email, password } = req.body;
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: password.toString(),
    });

    if (error) throw error;

    res.status(200).json({
      user: data.session.user,
      access_token: data.session.access_token,
      message: '로그인 성공했습니다.',
      status: 200,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error, message: '로그인 실패했습니다.', status: 400 });
  }
}

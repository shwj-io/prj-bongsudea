import { createClient } from '@/utils/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: password.toString(),
    });

    const access_token = data?.session.access_token;
    const refresh_token = data?.session.refresh_token;

    if (error) throw error;

    cookies().set({
      name: 'access_token',
      value: access_token,
      httpOnly: true,
      path: '/',
    });

    cookies().set({
      name: 'refresh_token',
      value: refresh_token,
      httpOnly: true,
      path: '/',
    });

    res.status(200).json({
      user: data.session.user,
      access_token,
      refresh_token,
      message: '로그인 성공했습니다.',
      status: 200,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error, message: '로그인 실패했습니다.', status: 400 });
  }
}

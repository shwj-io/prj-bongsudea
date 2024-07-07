import createClient from '@/utils/createClient';
import { createSupabse } from '@/utils/server';
import { NextApiRequest, NextApiResponse } from 'next';
// import { cookies } from 'next/headers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const supabase = createClient(req, res);
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: password.toString(),
    });

    const accessToken = data?.session.access_token;
    const refreshToken = data?.session.refresh_token;

    if (error) throw error;

    const expiresDate = new Date(data.session.expires_at * 1000).toUTCString();
    const accessTokenCookie = `access_token=${accessToken}; Path=/;`;
    const refreshTokenCookie = `refresh_token=${refreshToken}; Path=/;`;

    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

    res.status(200).json({
      user: data.session.user,
      accessToken,
      refreshToken,
      message: '로그인 성공했습니다.',
      status: 200,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error, message: '로그인 실패했습니다.', status: 400 });
  }
}

import createClient from '@/utils/createClient';
import { createSupabse } from '@/utils/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const supabase = createSupabse();
  const supabase = createClient(req, res);
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    const accessTokenCookie = `access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    const refreshTokenCookie = `refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    const supabaseAccessTokenCookie = `sb-ujjveycjjiwaukkaeqff-auth-token.0=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    const supabaseRefreshTokenCookie = `sb-ujjveycjjiwaukkaeqff-auth-token.1=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT `;

    res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
      supabaseAccessTokenCookie,
      supabaseRefreshTokenCookie,
    ]);

    res.status(200).json({
      // user: data.session.user,
      // access_token: data.session.access_token,
      message: '로그아웃에 성공했습니다',
      status: 200,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error, message: '로그아웃에 실패했습니다.', status: 400 });
  }
}

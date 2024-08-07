import { authCodeForSession } from '@/backend/modules/common';
import createClient from '@/utils/createClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;
  // console.log('req', urlParams);
  const supabase = createClient(req, res);
  try {
    const { accessToken, refreshToken, error } = await authCodeForSession(
      supabase,
      code as string
    );

    const accessTokenCookie = `access_token=${accessToken}; Path=/;`;
    const refreshTokenCookie = `refresh_token=${refreshToken}; Path=/;`;

    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

    const { data: session, error: sessionError } =
      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

    if (sessionError) throw sessionError;

    if (session) {
      res.redirect('http://localhost:3000/password/reset');
    }
  } catch (error) {
    res.status(400).json({
      error,
      message: '코드가 잘못되었습니다. 재시도해주세요',
      status: 400,
    });
  }
}

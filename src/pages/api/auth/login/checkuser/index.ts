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
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    const accessToken = data?.session.access_token;
    const refreshToken = data?.session.refresh_token;

    const accessTokenCookie = `access_token=${accessToken}; Path=/;`;
    const refreshTokenCookie = `refresh_token=${refreshToken}; Path=/;`;

    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

    if (error) throw error;

    if (data) {
      res.redirect('http://localhost:3000/test/password');
    }
  } catch (error) {
    res.status(400).json({
      error,
      message: '코드가 잘못되었습니다. 재시도해주세요',
      status: 400,
    });
  }
}

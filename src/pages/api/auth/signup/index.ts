// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createClient from '@/utils/createClient';
import { createSupabse } from '@/utils/server';
import type { NextApiRequest, NextApiResponse } from 'next';
// import { redirect } from 'next/dist/server/api-utils';

type Data = {
  name?: string;
  message: string;
  error?: any;
  data?: any;
  status: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const supabase = createSupabse();
  const supabase = createClient(req, res);
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: password.toString(),
      options: {
        data: {
          username: email,
          avatar_url: null,
        },
      },
    });

    const accessToken = data?.session.access_token;
    const refreshToken = data?.session.refresh_token;
    const userInfo = {
      id: data.user?.id,
      email: data.user?.email,
      username: data.user?.user_metadata.username,
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: data.session?.expires_at,
    };

    const accessTokenCookie = `access_token=${accessToken}; Path=/;`;
    const refreshTokenCookie = `refresh_token=${refreshToken}; Path=/;`;

    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

    if (error) throw error; // error가 있다면 catch 블록으로 넘어갑니다.

    // 에러가 없다면 가입 성공 메시지와 함께 데이터를 반환합니다.
    res
      .status(200)
      .json({ data: userInfo, message: '가입에 성공했습니다.', status: 200 });
  } catch (error) {
    // 에러 처리
    res
      .status(400)
      .json({ message: '오류가 발생했습니다', error: error, status: 400 });
  }
}

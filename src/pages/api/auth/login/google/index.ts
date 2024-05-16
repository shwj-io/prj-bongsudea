import { createClient } from '@/utils/createClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { redirect } from 'next/dist/server/api-utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000',
      },
    });

    if (error) throw error;

    res.redirect(data.url);
    // res.status(200).json({
    //   data: data,
    //   message: '구글로그인 링크 발급이 완료되었습니다.',
    //   status: 200,
    // });
  } catch (error) {
    res.status(400).json({
      message: '오류가 발생했습니다',
      error: error,
      status: 400,
    });
  }
}

import createClient from '@/utils/createClient';
import { createSupabse } from '@/utils/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { redirect } from 'next/navigation';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const supabase = createSupabse();
  const supabase = createClient(req, res);
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        // redirectTo: 'http://localhost:3000/login/auth',
        redirectTo: 'http://localhost:3000/api/auth/login/checkuser',
        // redirectTo: 'http://localhost:3000/test',
        // redirectTo: 'http://localhost:3000/api/hello',
      },
    });

    if (error) throw error;

    res.status(200).json({
      data,
      message: '구글로그인 링크 발급이 완료되었습니다.',
      status: 200,
    });
  } catch (error) {
    res.status(400).json({
      message: '오류가 발생했습니다',
      error,
      status: 400,
    });
  }
}

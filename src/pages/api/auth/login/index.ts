import { createClient } from '@/utils/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, email, password } = req.body;
  console.log('req', req.body);
  const supabase = createClient();
  if (type === 'email') {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: password.toString(),
      });

      if (error) throw error;

      res
        .status(200)
        .json({
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
  if (type === 'github') {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: 'http://localhost:3000',
        },
      });

      if (error) throw error;
      res.status(200).json({
        data: data,
        message: '깃허브 링크 발급이 완료되었습니다.',
        status: 200,
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: '오류가 발생했습니다', error: error, status: 400 });
    }
  }
  // if (req.method === 'GET') {
  //   res.status(200).json({ name: 'John Doe' });
  // }
  // if (req.method === 'POST') {
  //   res.status(200).json({ name: 'success' });
  // }
}

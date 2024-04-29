// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@/utils/server';
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
  console.log('req body', req.body);
  const supabase = createClient();
  const { type, email, password } = req.body;
  if (type === 'email') {
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

      if (error) throw error; // error가 있다면 catch 블록으로 넘어갑니다.

      // 에러가 없다면 가입 성공 메시지와 함께 데이터를 반환합니다.
      res.status(200).json({ data: data, message: '가입에 성공했습니다.' });
    } catch (error) {
      // 에러 처리
      res.status(400).json({ message: '오류가 발생했습니다', error: error });
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
      res
        .status(200)
        .json({
          data: data,
          message: '깃허브 링크 발급이 완료되었습니다.',
          status: 400,
        });
    } catch (error) {
      res
        .status(400)
        .json({ message: '오류가 발생했습니다', error: error, status: 400 });
    }
  }
}

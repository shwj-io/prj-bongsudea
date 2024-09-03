import createClient from '@/utils/createClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { code } = req.query;
  // console.log('query', req.query);
  const supabase = createClient(req, res);
  try {
    const { data, error } = await supabase
      .from('region')
      .select()
      .eq('id', 1111000000);

    // const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    // const { data, error } = await supabase.auth.signInWithIdToken({
    //   provider: 'google',
    //   token: code,
    // });

    if (error) throw error;

    // res.status(200).json({
    //   data: data,
    //   message: '로그인 성공했습니다.',
    //   status: 200,
    // });
    res.status(200).json({
      data,
      message: '데이터 성공',
    });
  } catch (error) {
    res
      .status(400)
      .json({ error, message: '로그인 실패했습니다.', status: 400 });
  }
}

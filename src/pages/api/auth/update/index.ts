import createClient from '@/utils/createClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { password } = req.body;
  const supabase = createClient(req, res);
  try {
    // 유저 정보를 업데이트 시킨다.
    const { data, error } = await supabase.auth.updateUser({
      password: password.toString(),
    });

    if (error) throw error;

    res
      .status(200)
      .json({ data, message: '패스워드가 변경 되었습니다.', status: 200 });
  } catch (error) {
    res
      .status(400)
      .json({ error, message: '패스워드 변경에 실패했습니다.', status: 400 });
  }
}

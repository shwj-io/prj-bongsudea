import { createClient } from '@/utils/createClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body;
  const supabase = createClient();
  try {
    // 패스워드를 리셋한다.
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/password-change',
    });

    if (error) throw error;

    res
      .status(200)
      .json({ data, message: '패스워드가 리셋되었습니다.', status: 200 });
  } catch (error) {
    res
      .status(400)
      .json({ error, message: '패스워드 변경에 실패했습니다.', status: 400 });
  }
}

import { createClient } from '@/utils/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, access_token, refresh_token } = req.body;
  const supabase = createClient();
  try {
    // 패스워드를 리셋한다.
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    // 유저 정보를 로그인시켜서 session을 만든다
    const { data: new_session, error: new_session_error } =
      await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

    // 유저 정보를 업데이트 시킨다.
    const { data: update_data, error: update_error } =
      await supabase.auth.updateUser({ email, password: password.toString() });

    if (error || update_error) throw { error, new_session_error, update_error };

    if (update_data) {
      res
        .status(200)
        .json({ data, message: '패스워드가 리셋되었습니다.', status: 200 });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error, message: '패스워드 변경에 실패했습니다.', status: 400 });
  }
}

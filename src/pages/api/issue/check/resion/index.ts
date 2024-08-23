import { NextApiRequest, NextApiResponse } from 'next';
import createClient from '@/utils/createClient';

// 위치 정보 코드 알아내는 api
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  const supabase = createClient(req, res);
  try {
    const { data, error } = await supabase
      .from('region')
      .select()
      .eq('region_code', query.code);
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: '잘못된 요청입니다.', error: err });
  }
}

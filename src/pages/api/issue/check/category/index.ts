import { NextApiRequest, NextApiResponse } from 'next';
import createClient from '@/utils/createClient';

// 카테고리 확인용 api
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  const supabase = createClient(req, res);
  try {
    const { data, error } = await supabase
      .from('issue_category')
      .select()
      .eq('category_name', query.category);
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: '잘못된 요청입니다.', error: err });
  }
}

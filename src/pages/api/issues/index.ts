import { NextApiRequest, NextApiResponse } from 'next';
import createClient from '@/utils/createClient';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, pageSize }: { [key: string]: string | string[] } = req.query;
  const supabase = createClient(req, res);
  try {
    if (page > pageSize) throw new Error('page가 pageSize보다 클수 없습니다');
    const { count } = await supabase
      .from('issue')
      .select('*', { count: 'exact' });
    const { data, error } = await supabase
      .from('issue')
      .select()
      .range(page - 1, page * pageSize - 1);
    if (error) throw error;
    res.status(200).json({
      status: 200,
      data,
      message: '호출이 정상적으로 되었습니다.',
      current_total: data.length,
      total: count,
    });
  } catch (err) {
    res.status(400).json({ message: '잘못된 요청입니다.', error: err.message });
  }
}

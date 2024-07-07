import { NextApiRequest, NextApiResponse } from 'next';
import createClient from '@/utils/createClient';
import { groupByCity } from '@/backend/modules/common';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  const supabase = createClient(req, res);
  if (query?.city) {
    try {
      const { data, error } = await supabase
        .from('resion')
        .select()
        .eq('main_city', query.city);
      const transformedData = groupByCity(data);
      res.status(200).json({ data: transformedData });
    } catch (err) {
      res.status(400).json({ message: '잘못된 요청입니다.', error: err });
    }
  } else {
    try {
      const { data, error } = await supabase.from('resion').select();
      const transformedData = groupByCity(data);

      res.status(200).json({ data: transformedData });
    } catch (err) {
      res.status(400).json({ message: '잘못된 요청입니다.', error: err });
    }
  }
}

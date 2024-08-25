import { NextApiRequest, NextApiResponse } from 'next';
import createClient from '@/utils/createClient';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    longtitude,
    latitude,
    distance = 100,
  }: { [key: string]: string | string[] | number } = req.query;
  const supabase = createClient(req, res);
  try {
    const { data, error } = await supabase.rpc(
      'get_issues_within_distance_join',
      {
        lon: Number(longtitude),
        lat: Number(latitude),
        distance: Number(distance),
      }
    );

    if (error) throw error;
    res.status(200).json({
      status: 200,
      data,
      message: '위치가 정상적으로 되었습니다.',
      current_total: data.length,
    });
  } catch (err) {
    res.status(400).json({ message: '잘못된 요청입니다.', error: err });
  }
}

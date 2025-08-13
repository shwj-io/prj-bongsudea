import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
// import createClient from '@/utils/createClient';

// x,y좌표값 알아내는 용도
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  // const supabase = createClient(req, res);
  try {
    const data = await axios.get(
      `https://maps.apigw.ntruss.com/map-geocode/v2/geocode?query=${query.area}`,
      {
        headers: {
          'x-ncp-apigw-api-key-id': process.env.NCP_API_KEY_ID,
          'x-ncp-apigw-api-key': process.env.NCP_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    res.status(200).json({ message: '데이터 조회 성공', data: data.data });
  } catch (err) {
    res.status(400).json({ message: '잘못된 요청입니다.', error: err });
  }
}

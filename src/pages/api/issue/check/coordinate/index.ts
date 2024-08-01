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
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${query.area}`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': process.env.NCP_API_KEY_ID,
          'X-NCP-APIGW-API-KEY': process.env.NCP_API_KEY,
        },
      }
    );
    res.status(200).json({ data: data.data });
  } catch (err) {
    res.status(400).json({ message: '잘못된 요청입니다.', error: err });
  }
}

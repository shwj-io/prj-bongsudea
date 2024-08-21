import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
// import createClient from '@/utils/createClient';

// 카카오api x,y좌표값 알아내는 용도
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  // const supabase = createClient(req, res);
  try {
    const data = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${query.area}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
        },
      }
    );
    res.status(200).json({ message: '데이터 조회 성공', data: data.data });
  } catch (err) {
    res.status(400).json({ message: '잘못된 요청입니다.', error: err });
  }
}

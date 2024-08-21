import createClient from '@/utils/createClient';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import testData from '../../backend/240821_copy.json';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query } = req;
  const data = testData.disasterSmsList.map(item => {
    const areaItem = item.RCV_AREA_NM.split(',')[0];
    const convert = areaItem.includes('전체')
      ? areaItem.replace('전체', '')
      : areaItem;
    return {
      ...item,
      converArea: convert.trim(),
    };
  });
  res.status(200).json({ data });
  // try {
  //   const data = await axios.get(
  //     `http://localhost:3000/api/issue/check/coordinate/kakao?area=${query.area}`
  //   );
  //   res.status(200).json({ message: '데이터 조회 성공', data: data.data });
  // } catch (err) {
  //   res.status(400).json({ message: '잘못된 요청입니다.', error: err });
  // }
}

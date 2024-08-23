import { NextApiRequest, NextApiResponse } from 'next';
import createClient from '@/utils/createClient';
// import test from '../../backend/modules/calamiter.json';
// import test2 from '../../backend/20240717.json';
import test2 from '../../backend/20240717_copy.json';
import data0731 from '../../backend/20240731.json';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { query } = req;
  const supabase = createClient(req, res);
  try {
    const mapToData = await Promise.all(
      data0731.disasterSmsList.map(async item => {
        const areaItem = item.RCV_AREA_NM.split(',')[0];

        try {
          const [geocodeResponse, categoryResponse, resionResponse] =
            await Promise.all([
              axios.get(
              axios.get(
                `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${convert.trim()}`,
                {
                  headers: {
                    'X-NCP-APIGW-API-KEY-ID': process.env.NCP_API_KEY_ID,
                    'X-NCP-APIGW-API-KEY': process.env.NCP_API_KEY,
                  },
                }
              ),
              supabase
                .from('issue_category')
                .select()
                .eq('category_name', item.DSSTR_SE_NM),
              supabase
                .from('resion')
                .select()
                .eq('sub_city', item.RCV_AREA_NM.split(' ')[1]),
            ]);

          const location = geocodeResponse.data.addresses[0];
          const category = categoryResponse.data[0];
          const resion = resionResponse?.data[0];

          if (!item.MSG_CN.includes('경찰청')) {
            return {
              id: item.MD101_SN,
              status_id: item.MSG_CN.includes('경보') ? 30 : 20,
              issue_title: '재난문자',
              issue_description: null,
              issue_contents: item.MSG_CN,
              issue_type: item.DSSTR_SE_NM,
              created_at: item.CREAT_DT,
              updated_at: item.CREAT_DT,
              author: '관리자',
              expired_at: item.MODF_DT,
              is_admin: false,
              is_allow: true,
              location_x: location ? location.x : null,
              location_y: location ? location.y : null,
              category_id: category ? category.category_id : null,
              user_id: '778bc244-23e7-4d6e-b7f3-8ee61d6ab221',
              region_id: resion ? resion.id : null,
            };
          }
          return null;
        } catch (error) {
          console.error(`Error fetching data for ${areaItem}:`, error);
          return {
            issue_id: item.MD101_SN,
            status_id: item.MSG_CN.includes('경보') ? 30 : 20,
            issue_title: '재난문자 시리즈',
            issue_description: null,
            issue_contents: !item.MSG_CN.includes('경찰청') && item.MSG_CN,
            issue_type: item.DSSTR_SE_NM,
            create_at: item.CREAT_DT,
            update_at: null,
            author: '관리자',
            expired_at: item.MODF_DT,
            is_admin: false,
            is_allow: true,
            location_x: null,
            location_y: null,
            area: areaItem,
            category_id: null,
          };
        }
      })
    );
    res.status(200).json({ data: mapToData.filter(item => item !== null) });
  } catch (err) {
    res.status(400).json({ message: '잘못된 요청입니다.', error: err });
  }
}

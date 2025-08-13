import { NextApiRequest, NextApiResponse } from 'next';
import createClient from '@/utils/createClient';
// import test from '../../backend/modules/calamiter.json';
// import test2 from '../../backend/20240717.json';
// import data0731 from '../../backend/20240731.json';
// import data250629 from '../../backend/20250629.json';
import data250629test from '../../backend/20250629test.json';
import axios from 'axios';

interface ProcessedData {
  id?: number;
  issue_id?: number;
  status_id: number;
  issue_title: string;
  issue_description: null;
  issue_contents: string | null;
  issue_type: string;
  created_at?: string;
  create_at?: string;
  updated_at?: string;
  update_at?: string | null;
  author: string;
  expired_at: string;
  is_admin: boolean;
  is_allow: boolean;
  location_x: string | null;
  location_y: string | null;
  category_id: number | null;
  user_id?: string;
  region_id: number | null;
  area: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { query } = req;
  const supabase = createClient(req, res);
  try {
    // 각 아이템에서 지역들을 분리하여 처리할 작업 배열 생성
    const processingTasks = data250629test.disasterSmsList.flatMap(item => {
      const areas = item.RCV_AREA_NM.split(',')
        .map(area => area.trim())
        .filter(area => area);

      return areas.map(areaItem => {
        const cleanedArea = areaItem.replace('전체', '').trim();
        const areaParts = cleanedArea.split(' ').filter(part => part);

        // main_city와 sub_city 분리
        const mainCity = areaParts[0] || '';
        const subCity = areaParts[1] || '전체';

        return {
          item,
          cleanedArea,
          mainCity,
          subCity,
        };
      });
    });

    console.log('processingTasks @@@@@@@@@@@@@@@@@@@@@@@@@', processingTasks);

    const allResults = await Promise.all(
      processingTasks.map(async ({ item, cleanedArea, mainCity, subCity }) => {
        console.log(
          ' area processing:',
          cleanedArea,
          'main_city:',
          mainCity,
          'sub_city:',
          subCity
        );

        try {
          const [geocodeResponse, categoryResponse, resionResponse] =
            await Promise.all([
              axios.get(
                `https://maps.apigw.ntruss.com/map-geocode/v2/geocode?query=${cleanedArea}`,
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
                .from('region')
                .select()
                .eq('main_city', mainCity)
                .eq('sub_city', subCity),
            ]);

          console.log(
            'resionResponse @@@@@@@@@@@@@@@@@@@@@@@@@',
            resionResponse
          );

          const location = geocodeResponse.data.addresses?.[0];
          console.log('location @@@@@@@@@@@@@@@@@@@@@@@@@', location);
          const category = categoryResponse.data?.[0];
          console.log('category @@@@@@@@@@@@@@@@@@@@@@@@@', category);
          const resion = resionResponse?.data?.[0];
          console.log('resion @@@@@@@@@@@@@@@@@@@@@@@@@', resion);

          if (!item.MSG_CN.includes('경찰청')) {
            console.log('hererererererre @@@@@@@@@@@@@@@@@@##########');
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
              area: cleanedArea,
            } as ProcessedData;
          }
          return null;
        } catch (error) {
          console.error(`Error fetching data for ${cleanedArea}:`, error);
          return {
            issue_id: item.MD101_SN,
            status_id: item.MSG_CN.includes('경보') ? 30 : 20,
            issue_title: '재난문자 시리즈',
            issue_description: null,
            issue_contents: !item.MSG_CN.includes('경찰청')
              ? item.MSG_CN
              : null,
            issue_type: item.DSSTR_SE_NM,
            create_at: item.CREAT_DT,
            update_at: null,
            author: '관리자',
            expired_at: item.MODF_DT,
            is_admin: false,
            is_allow: true,
            location_x: null,
            location_y: null,
            area: cleanedArea,
            category_id: null,
          } as ProcessedData;
        }
      })
    );

    res.status(200).json({ data: allResults.filter(item => item !== null) });
  } catch (err) {
    res.status(400).json({ message: '잘못된 요청입니다.', error: err });
  }
}

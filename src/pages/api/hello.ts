import createClient from '@/utils/createClient';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import testData from '../../backend/240821.json';
import { isObjectEmpty } from '@/backend/modules/common';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query } = req;
  const supabase = createClient(req, res);
  try {
    const data = await Promise.all(
      testData.disasterSmsList.map(async item => {
        const areaItem = item.RCV_AREA_NM.split(',')[0];
        const convert = areaItem.includes('전체')
          ? areaItem.replace('전체', '')
          : areaItem;

        try {
          const [geocodeResponse, categoryResponse, resionResponse] =
            await Promise.all([
              // axios.get(
              //   `https://dapi.kakao.com/v2/local/search/address.json?query=${convert.trim()}`,
              //   {
              //     headers: {
              //       Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
              //     },
              //   }
              // ),
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

          // 카카오
          // const location = geocodeResponse.data.documents[0];
          // 네이버
          const location = geocodeResponse.data.addresses[0];
          const category = categoryResponse.data[0];
          const resion = resionResponse?.data[0];

          const { data: locationData, error: locationError } = await supabase
            .from('issue_location')
            .insert({
              location_x: location ? location.x : null,
              location_y: location ? location.y : null,
              location: `POINT(${location.x} ${location.y})`,
            })
            .select();

          console.log('locationData', locationData);
          console.log('location-ERROR', locationError);

          if (!item.MSG_CN.includes('경찰청')) {
            return {
              id: item.MD101_SN,
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
              status_id: item.MSG_CN.includes('경보') ? 30 : 20,
              issue_location_id: locationData[0].id,
              // location_x: location ? location.y : null,
              // location_y: location ? location.x : null,
              category_id: category ? category.category_id : null,
              user_id: '778bc244-23e7-4d6e-b7f3-8ee61d6ab221',
              region_id: resion ? resion.id : null,
            };
          }
          return null;
        } catch (error) {
          console.error(`Error fetching data for ${areaItem}:`, error);
          return null;
          // return {
          //   id: item.MD101_SN,
          //   issue_title: '재난문자',
          //   issue_description: null,
          //   issue_contents: item.MSG_CN,
          //   issue_type: item.DSSTR_SE_NM,
          //   created_at: item.CREAT_DT,
          //   updated_at: item.CREAT_DT,
          //   author: '관리자',
          //   expired_at: item.MODF_DT,
          //   is_admin: false,
          //   is_allow: true,
          //   status_id: item.MSG_CN.includes('경보') ? 30 : 20,
          //   issue_location_id: locationData[0].id,
          //   // location_x: location ? location.y : null,
          //   // location_y: location ? location.x : null,
          //   category_id: category ? category.category_id : null,
          //   user_id: '778bc244-23e7-4d6e-b7f3-8ee61d6ab221',
          //   region_id: resion ? resion.id : null,
          // };
        }
      })
    );

    // console.log('data', data);
    const filterdItems = data.filter(item => item !== null);
    const { data: insertData, error } = await supabase
      .from('issues')
      .insert(filterdItems)
      .select();
    console.log('error', error);
    // const { error: locationError } = await supabase
    //   .from('issue_location')
    //   .insert({
    //     id: 1,
    //     location_x:
    //   });
    if (error || locationError) throw error || locationError;
    res.status(200).json({
      count: filterdItems.length,
      message: '데이터가 성공적으로 삽입되었습니다.',
      data: insertData,
    });
  } catch (error) {
    res.status(400).json({ message: '잘못된 요청입니다.', error });
  }
}

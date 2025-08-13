import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

interface DisasterSmsItem {
  MD101_SN: number;
  MSG_CN: string;
  DSSTR_SE_NM: string;
  RCV_AREA_NM: string;
  CREAT_DT: string;
  MODF_DT: string;
}

interface DisasterApiResponse {
  disasterSmsList: DisasterSmsItem[];
}

interface ProcessingTask {
  item: DisasterSmsItem;
  cleanedArea: string;
  mainCity: string;
  subCity: string;
}

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
  issue_location_id?: number;
}

type ResponseData = {
  count?: number;
  message?: string;
  data?: ProcessedData[] | null;
  error?: unknown;
};

// 재난문자 API 호출 함수
async function fetchDisasterSmsData(
  searchBgnDe: string,
  searchEndDe: string,
  pageUnit: string = '500'
): Promise<DisasterApiResponse> {
  const response = await axios.post<DisasterApiResponse>(
    'https://www.safekorea.go.kr/idsiSFK/sfk/cs/sua/web/DisasterSmsList.do',
    {
      searchInfo: {
        pageIndex: '1',
        pageUnit,
        pageSize: '10',
        firstIndex: '1',
        lastIndex: '1',
        recordCountPerPage: '10',
        searchBgnDe,
        searchEndDe,
        searchGb: '1',
        searchWrd: '',
        rcv_Area_Id: '',
        dstr_se_Id: '',
        c_ocrc_type: '',
        sbLawArea1: '',
        sbLawArea2: '',
        sbLawArea3: '',
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<void> {
  // Service role key를 사용하여 RLS 우회
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // 쿼리 파라미터에서 값 추출 (기본값 설정)
    const { pageUnit = '500', searchBgnDe, searchEndDe } = req.query;

    let startDate: string;
    let endDate: string;

    // 날짜 파라미터가 없으면 기본값 설정 (최근 3일)
    if (!searchBgnDe || !searchEndDe) {
      const today = new Date();
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(today.getDate() - 3);

      [endDate] = today.toISOString().split('T'); // YYYY-MM-DD 형식
      [startDate] = threeDaysAgo.toISOString().split('T'); // YYYY-MM-DD 형식
    } else {
      [startDate] = Array.isArray(searchBgnDe) ? searchBgnDe : [searchBgnDe];
      [endDate] = Array.isArray(searchEndDe) ? searchEndDe : [searchEndDe];
    }

    const pageUnitStr = Array.isArray(pageUnit) ? pageUnit[0] : pageUnit;

    const disasterData = await fetchDisasterSmsData(
      startDate,
      endDate,
      pageUnitStr
    );

    if (!disasterData?.disasterSmsList) {
      return res.status(200).json({
        count: 0,
        message: '재난문자 데이터가 없습니다.',
        data: [],
      });
    }

    // 각 아이템에서 지역들을 분리하여 처리할 작업 배열 생성
    const processingTasks: ProcessingTask[] =
      disasterData.disasterSmsList.flatMap((item: DisasterSmsItem) => {
        const areas = item.RCV_AREA_NM.split(',')
          .map((area: string) => area.trim())
          .filter((area: string) => area);

        return areas.map((areaItem: string) => {
          const cleanedArea = areaItem.replace('전체', '').trim();
          const areaParts = cleanedArea
            .split(' ')
            .filter((part: string) => part);

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
      processingTasks.map(
        async ({ item, cleanedArea, mainCity, subCity }: ProcessingTask) => {
          console.log(
            ' area processing:',
            cleanedArea,
            'main_city:',
            mainCity,
            'sub_city:',
            subCity
          );

          try {
            const [geocodeResponse, categoryResponse, regionResponse] =
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
              'regionResponse @@@@@@@@@@@@@@@@@@@@@@@@@',
              regionResponse
            );

            const location = geocodeResponse.data.addresses?.[0];
            console.log('location @@@@@@@@@@@@@@@@@@@@@@@@@', location);
            const category = categoryResponse.data?.[0];
            console.log('category @@@@@@@@@@@@@@@@@@@@@@@@@', category);
            const region = regionResponse?.data?.[0];
            console.log('region @@@@@@@@@@@@@@@@@@@@@@@@@', region);

            // issue_location 테이블에 먼저 삽입
            let locationData = null;
            let locationError = null;

            if (location) {
              const { data: insertedLocationData, error: insertLocationError } =
                await supabase
                  .from('issue_location')
                  .insert({
                    location_x: location.x,
                    location_y: location.y,
                    location: `POINT(${location.x} ${location.y})`,
                  })
                  .select();

              locationData = insertedLocationData;
              locationError = insertLocationError;

              console.log('locationData', locationData);
              console.log('location-ERROR', locationError);
            }

            if (!item.MSG_CN.includes('경찰청')) {
              console.log('hererererererre @@@@@@@@@@@@@@@@@@##########');

              // CREAT_DT를 기준으로 당일 23:59:59초로 expired_at 설정
              const createDate = new Date(item.CREAT_DT);
              createDate.setHours(23, 59, 59, 999);
              const expiredAt = createDate.toISOString();

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
                expired_at: expiredAt,
                is_admin: false,
                is_allow: true,
                location_x: location ? location.x : null,
                location_y: location ? location.y : null,
                category_id: category ? category.category_id : null,
                user_id: '778bc244-23e7-4d6e-b7f3-8ee61d6ab221',
                region_id: region ? region.id : null,
                area: cleanedArea,
                issue_location_id: locationData?.[0]?.id || null,
              } as ProcessedData;
            }
            return null;
          } catch (error) {
            console.error(`Error fetching data for ${cleanedArea}:`, error);

            // CREAT_DT를 기준으로 당일 23:59:59초로 expired_at 설정
            const createDate = new Date(item.CREAT_DT);
            createDate.setHours(23, 59, 59, 999);
            const expiredAt = createDate.toISOString();

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
              expired_at: expiredAt,
              is_admin: false,
              is_allow: true,
              location_x: null,
              location_y: null,
              area: cleanedArea,
              category_id: null,
              region_id: null,
            } as ProcessedData;
          }
        }
      )
    );

    const filteredItems = allResults.filter(
      (item): item is ProcessedData => item !== null
    );

    // issues 테이블에 맞게 area 필드 제거
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const itemsForInsert = filteredItems.map((item: ProcessedData) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { area, location_x, location_y, ...itemWithoutArea } = item;
      return itemWithoutArea;
    });

    const { data: insertData, error } = await supabase
      .from('issues')
      .upsert(itemsForInsert, {
        onConflict: 'id',
        ignoreDuplicates: true,
      })
      .select();

    console.log('insert error', error);

    if (error) throw error;

    return res.status(200).json({
      count: filteredItems.length,
      message: '데이터가 성공적으로 삽입되었습니다.',
      data: insertData,
    });
  } catch (error) {
    return res.status(400).json({ message: '잘못된 요청입니다.', error });
  }
}

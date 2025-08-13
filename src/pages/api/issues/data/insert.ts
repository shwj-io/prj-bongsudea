import { NextApiRequest, NextApiResponse } from 'next';
import createClient from '@/utils/createClient';
import axios from 'axios';

interface DisasterItem {
  MD101_SN?: number;
  RCV_AREA_NM: string;
  MSG_CN: string;
  DSSTR_SE_NM: string;
  CREAT_DT: string;
  MODF_DT: string;
}

interface ProcessedData {
  id: number;
  status_id: number;
  issue_title: string;
  issue_description: null;
  issue_contents: string | null;
  issue_type: string;
  created_at: string;
  updated_at: string;
  author: string;
  expired_at: string;
  is_admin: boolean;
  is_allow: boolean;
  location_x: string | null;
  location_y: string | null;
  category_id: number | null;
  user_id: string;
  region_id: number | null;
}

interface SearchInfo {
  pageIndex?: string;
  pageUnit?: string;
  pageSize?: string;
  firstIndex?: string;
  lastIndex?: string;
  recordCountPerPage?: string;
  searchBgnDe: string;
  searchEndDe: string;
  searchGb?: string;
  searchWrd?: string;
  rcv_Area_Id?: string;
  dstr_se_Id?: string;
  c_ocrc_type?: string;
  sbLawArea1?: string;
  sbLawArea2?: string;
  sbLawArea3?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'POST 메서드만 허용됩니다.' });
    return;
  }

  const supabase = createClient(req, res);

  try {
    const { searchBgnDe, searchEndDe, pageUnit = '500' } = req.body;

    if (!searchBgnDe || !searchEndDe) {
      res.status(400).json({
        message: 'searchBgnDe(시작일)와 searchEndDe(종료일)가 필요합니다.',
        example: {
          searchBgnDe: '2025-06-25',
          searchEndDe: '2025-06-29',
          pageUnit: '500',
        },
      });
      return;
    }

    // 안전한국 API 호출
    const searchInfo: SearchInfo = {
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
    };

    console.log('안전한국 API 호출 중...', { searchInfo });

    const safeKoreaResponse = await axios.post(
      'https://www.safekorea.go.kr/idsiSFK/sfk/cs/sua/web/DisasterSmsList.do',
      { searchInfo },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      }
    );

    console.log('안전한국 API 응답:', safeKoreaResponse.data);

    if (!safeKoreaResponse.data?.disasterSmsList) {
      res.status(400).json({
        message: '안전한국 API에서 데이터를 가져올 수 없습니다.',
        apiResponse: safeKoreaResponse.data,
      });
      return;
    }

    const disasterData = safeKoreaResponse.data.disasterSmsList;

    // MD101_SN이 있는 항목들만 필터링하여 중복 체크
    const itemsWithId = disasterData.filter(
      (item: DisasterItem) => item.MD101_SN
    );

    if (itemsWithId.length === 0) {
      res.status(200).json({
        message: 'MD101_SN이 있는 항목이 없습니다.',
        inserted: 0,
        totalFetched: disasterData.length,
      });
      return;
    }

    // issue 테이블에서 기존 MD101_SN들 조회
    const existingIds = itemsWithId.map((item: DisasterItem) => item.MD101_SN);
    const { data: existingRecords } = await supabase
      .from('issue')
      .select('id')
      .in('id', existingIds);

    const existingIdSet = new Set(
      existingRecords?.map(record => record.id) || []
    );

    // issue 테이블에 없는 MD101_SN만 필터링
    const newItems = itemsWithId.filter(
      (item: DisasterItem) => !existingIdSet.has(item.MD101_SN)
    );

    if (newItems.length === 0) {
      res.status(200).json({
        message: '모든 데이터가 이미 issue 테이블에 존재합니다.',
        inserted: 0,
        totalFetched: disasterData.length,
        existingCount: existingIdSet.size,
      });
      return;
    }

    const mapToData = await Promise.all(
      newItems.map(
        async (item: DisasterItem): Promise<ProcessedData | null> => {
          const areaItem = item.RCV_AREA_NM.split(',')[0]
            .replace('전체', '')
            .trim();

          try {
            const [geocodeResponse, categoryResponse, resionResponse] =
              await Promise.all([
                axios.get(
                  `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${areaItem.trim()}`,
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

            const location = geocodeResponse.data.addresses?.[0];
            const category = categoryResponse.data?.[0];
            const resion = resionResponse?.data?.[0];

            if (!item.MSG_CN.includes('경찰청')) {
              return {
                id: item.MD101_SN!,
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
              id: item.MD101_SN!,
              status_id: item.MSG_CN.includes('경보') ? 30 : 20,
              issue_title: '재난문자',
              issue_description: null,
              issue_contents: !item.MSG_CN.includes('경찰청')
                ? item.MSG_CN
                : null,
              issue_type: item.DSSTR_SE_NM,
              created_at: item.CREAT_DT,
              updated_at: item.CREAT_DT,
              author: '관리자',
              expired_at: item.MODF_DT,
              is_admin: false,
              is_allow: true,
              location_x: null,
              location_y: null,
              category_id: null,
              user_id: '778bc244-23e7-4d6e-b7f3-8ee61d6ab221',
              region_id: null,
            };
          }
        }
      )
    );

    // null이 아닌 항목들만 필터링
    const validData = mapToData.filter(
      (item: ProcessedData | null): item is ProcessedData => item !== null
    );

    if (validData.length === 0) {
      res.status(200).json({
        message: '삽입할 유효한 데이터가 없습니다. (모두 경찰청 관련 메시지)',
        inserted: 0,
        totalFetched: disasterData.length,
        existingCount: existingIdSet.size,
      });
      return;
    }

    // issue 테이블에 데이터 삽입
    const { data: insertedData, error } = await supabase
      .from('issue')
      .insert(validData)
      .select();

    if (error) {
      throw error;
    }

    res.status(200).json({
      message: 'issue 테이블에 없는 새로운 데이터가 성공적으로 삽입되었습니다.',
      inserted: insertedData.length,
      totalFetched: disasterData.length,
      existingCount: existingIdSet.size,
      searchPeriod: `${searchBgnDe} ~ ${searchEndDe}`,
      data: insertedData,
    });
  } catch (err) {
    console.error('API Error:', err);
    res.status(400).json({
      message: '잘못된 요청입니다.',
      error: err instanceof Error ? err.message : err,
    });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import createClient from '@/utils/createClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    page,
    pageSize,
    lat,
    lng,
    distance = '100', // 기본 100미터
  } = req.query;

  const supabase = createClient(req, res);
  const NumberPage = Number(page);
  const NumberPageSize = Number(pageSize);
  const latitude = Number(lat);
  const longitude = Number(lng);
  const searchDistance = Number(distance);

  try {
    if (NumberPage > NumberPageSize)
      throw new Error('page가 pageSize보다 클수 없습니다');

    // 위치 기반 검색이 요청된 경우
    if (lat && lng && !Number.isNaN(latitude) && !Number.isNaN(longitude)) {
      // PostgreSQL 함수를 사용한 거리 계산 및 필터링
      const { data: locationData, error: locationError } = await supabase.rpc(
        'get_issues_with_distance',
        {
          target_lat: latitude,
          target_lng: longitude,
          max_distance_meters: searchDistance,
          page_offset: NumberPageSize * (NumberPage - 1),
          page_limit: NumberPageSize,
        }
      );

      if (locationError) {
        console.error('Location RPC error:', locationError);
        throw new Error(
          '위치 기반 검색에 실패했습니다. RPC 함수가 생성되지 않았을 수 있습니다.'
        );
      }

      // 전체 개수 조회 (거리 조건 포함)
      const { data: countData, error: countError } = await supabase.rpc(
        'count_issues_within_distance',
        {
          target_lat: latitude,
          target_lng: longitude,
          max_distance_meters: searchDistance,
        }
      );

      if (countError) {
        console.error('Count RPC error:', countError);
      }

      const totalCount = countData || 0;

      return res.status(200).json({
        status: 200,
        data: locationData || [],
        message: '위치 기반 검색이 완료되었습니다.',
        current_total: locationData?.length || 0,
        total: totalCount,
        search_params: {
          latitude,
          longitude,
          distance: searchDistance,
        },
      });
    }

    // 일반 검색 (위치 필터링 없음) - 위치 정보 포함
    const { count } = await supabase
      .from('issues')
      .select('*', { count: 'exact' });

    const { data, error } = await supabase
      .from('issues')
      .select(
        `
        *,
        issue_location (
          id,
          location_x,
          location_y,
          location
        )
      `
      )
      .order('id', { ascending: false })
      .range(
        NumberPageSize * (NumberPage - 1),
        NumberPage * NumberPageSize - 1
      );

    if (error) throw error;

    return res.status(200).json({
      status: 200,
      data,
      message: '호출이 정상적으로 되었습니다.',
      current_total: data.length,
      total: count,
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
    return res
      .status(400)
      .json({ message: '잘못된 요청입니다.', error: errorMessage });
  }
}

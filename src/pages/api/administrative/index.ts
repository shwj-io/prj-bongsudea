import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/utils/createClient';

function groupByCity(data) {
  let subCityId = 1; // Start the sub-city id from 1

  return data.reduce((acc, currentValue) => {
    let group = acc.find(g => g.city === currentValue.main_city);

    if (!group) {
      group = { city: currentValue.main_city, area: [] };
      acc.push(group);
    }

    // Add sub_city with an id property
    group.area.push({ id: subCityId++, city: currentValue.sub_city });

    return acc;
  }, []);
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  const supabase = createClient();
  if (query?.city) {
    try {
      const { data, error } = await supabase
        .from('resion')
        .select()
        .eq('main_city', query.city);
      const transformedData = groupByCity(data);
      res.status(200).json({ data: transformedData });
    } catch (err) {
      res.status(400).json({ message: '잘못된 요청입니다.' });
    }
  } else {
    try {
      const { data, error } = await supabase.from('resion').select();
      const transformedData = groupByCity(data);

      res.status(200).json({ data: transformedData, error: error });
    } catch (err) {
      res.status(400).json({ message: '잘못된 요청입니다.' });
    }
  }
}

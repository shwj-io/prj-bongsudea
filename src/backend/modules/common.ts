import createClient from '@/utils/createClient';
import { SupabaseClient } from '@supabase/supabase-js';

const groupByCity = data => {
  let subCityId = 1; // Start the sub-city id from 1

  return data.reduce((acc, currentValue) => {
    let group = acc.find(g => g.city === currentValue.main_city);

    if (!group) {
      group = { city: currentValue.main_city, area: [] };
      acc.push(group);
    }

    // Add sub_city with an id property
    group.area.push({ id: currentValue.id, city: currentValue.sub_city });

    return acc;
  }, []);
};

const authCodeForSession = async (supabase: SupabaseClient, code: string) => {
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  const accessToken = data?.session.access_token;
  const refreshToken = data?.session.refresh_token;

  return {
    accessToken,
    refreshToken,
    error,
  };
};

export { groupByCity, authCodeForSession };

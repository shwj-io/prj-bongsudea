// import { createClient as createClientPrimitive } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

export function createSupabse() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return supabase;
}

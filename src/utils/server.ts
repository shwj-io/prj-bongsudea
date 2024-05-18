import {
  CookieOptions,
  createBrowserClient,
  createServerClient,
  serialize,
} from '@supabase/ssr';
import { createClient as createClientPrimitive } from '@supabase/supabase-js';

export function createClient() {
  const supabase = createClientPrimitive(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return supabase;
}

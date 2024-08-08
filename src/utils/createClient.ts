import {
  createServerClient,
  type CookieOptions,
  serialize,
} from '@supabase/ssr';
import { type NextApiRequest, type NextApiResponse } from 'next';

export default function createClient(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        flowType: 'pkce', // Using PKCE for enhanced security
        autoRefreshToken: true, // 자동 토큰 갱신 활성화
        persistSession: true, // 세션을 로컬 스토리지에 저장
      },
      cookies: {
        get(name: string) {
          return req.cookies[name];
        },
        set(name: string, value: string, options: CookieOptions) {
          res.appendHeader('Set-Cookie', serialize(name, value, options));
        },
        remove(name: string, options: CookieOptions) {
          res.appendHeader('Set-Cookie', serialize(name, '', options));
        },
      },
    }
  );

  return supabase;
}

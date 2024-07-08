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
    // {}
    {
      auth: {
        flowType: 'pkce', // Using PKCE for enhanced security
      },
      cookies: {
        get(name: string) {
          return req.cookies[name];
        },
        set(name: string, value: string, options: CookieOptions) {
          console.log('name', name);
          console.log('value', value);
          console.log('options', options);
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

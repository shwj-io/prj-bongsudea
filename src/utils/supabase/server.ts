import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { type NextApiRequest, type NextApiResponse } from 'next';

// Pages Router용 서버 클라이언트 (API 라우트에서 사용)
export function createClient(req: NextApiRequest, res: NextApiResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies[name];
        },
        set(name: string, value: string, options: CookieOptions) {
          res.setHeader(
            'Set-Cookie',
            `${name}=${value}; Path=/; ${options.httpOnly ? 'HttpOnly;' : ''} ${options.secure ? 'Secure;' : ''} ${options.sameSite ? `SameSite=${options.sameSite};` : ''} ${options.maxAge ? `Max-Age=${options.maxAge};` : ''}`
          );
        },
        remove(name: string, options: CookieOptions) {
          res.setHeader(
            'Set-Cookie',
            `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${options.httpOnly ? 'HttpOnly;' : ''} ${options.secure ? 'Secure;' : ''} ${options.sameSite ? `SameSite=${options.sameSite};` : ''}`
          );
        },
      },
    }
  );
}

// 서버 사이드 렌더링용 클라이언트 (getServerSideProps에서 사용)
export function createSSRClient(context: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  return createClient(context.req, context.res);
}

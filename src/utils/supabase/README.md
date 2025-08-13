# Supabase 유틸리티 사용법 (Pages Router)

## 파일 구조

- `client.ts` - 브라우저(클라이언트 사이드)에서 사용
- `server.ts` - API 라우트, getServerSideProps에서 사용
- `middleware.ts` - Next.js 미들웨어에서 사용
- `index.ts` - 모든 유틸리티를 export

## 사용 예시

### 1. 클라이언트 컴포넌트에서 사용

```tsx
'use client';

import { createBrowserClient } from '@/utils/supabase';
import { useEffect, useState } from 'react';

export default function ClientComponent() {
  const [user, setUser] = useState(null);
  const supabase = createBrowserClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  return <div>{user ? `안녕하세요, ${user.email}` : '로그인이 필요합니다.'}</div>;
}
```

### 2. API 라우트에서 사용

```tsx
// pages/api/profile.ts
import { createServerClient } from '@/utils/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerClient(req, res);
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return res.status(401).json({ error: '인증이 필요합니다.' });
  }

  return res.json({ user });
}
```

### 3. getServerSideProps에서 사용

```tsx
// pages/dashboard.tsx
import { createSSRClient } from '@/utils/supabase';
import { GetServerSideProps } from 'next';

export default function Dashboard({ user }) {
  return <div>환영합니다, {user.email}!</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createSSRClient(context);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};
```

### 4. 미들웨어에서 사용

```tsx
// middleware.ts (프로젝트 루트)
import { updateSession } from '@/utils/supabase';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```

## 기존 파일과의 차이점

### 기존 파일들

- `createClient.ts` - API 라우트 전용 (NextApiRequest/NextApiResponse 사용)
- `server.ts` - 기본 클라이언트 생성 (쿠키 처리 없음)

### 새로운 파일들

- `client.ts` - 브라우저 전용 클라이언트
- `server.ts` - Pages Router용 서버 클라이언트 (API 라우트, getServerSideProps)
- `middleware.ts` - 미들웨어 전용

## 권장사항

- 클라이언트 컴포넌트: `createBrowserClient()` 사용
- API 라우트: `createServerClient(req, res)` 사용
- getServerSideProps: `createSSRClient(context)` 사용
- 미들웨어: `updateSession()` 사용

## Pages Router vs App Router 차이점

### Pages Router (현재 프로젝트)

```typescript
// API 라우트
import { createServerClient } from '@/utils/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerClient(req, res);
  // ...
}

// getServerSideProps
import { createSSRClient } from '@/utils/supabase';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createSSRClient(context);
  // ...
};
```

### App Router

```typescript
// App Router에서는 next/headers 사용
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();
  // ...
}
```

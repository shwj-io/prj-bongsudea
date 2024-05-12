import { NextRequest, NextResponse } from 'next/server';
// import { useUserStore } from './store/user';

// const protectedRoutes = ['/myPage'];
// const publicRoutes = ['/login', '/signUp', 'findPassword', '/'];

export default async function middleware(req: NextRequest) {
  //   // const { accessToken, username, saveUser, removeUser } = useUserStore();
  //   const local = localStorage?.getItem('state');
  //   const { accessToken } = local;
  //   const path = req.nextUrl.pathname;
  //   const isProtectedRoute = protectedRoutes.includes(path);
  //   const isPublicRoute = publicRoutes.includes(path);
  //   if (isProtectedRoute && accessToken) {
  //     return NextResponse.redirect(new URL('/login', req.nextUrl));
  //   }
  //   if (
  //     isPublicRoute &&
  //     accessToken &&
  //     !req.nextUrl.pathname.startsWith('/dashboard')
  //   ) {
  //     return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  //   }
  //   return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

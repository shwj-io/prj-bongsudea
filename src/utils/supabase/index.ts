// 클라이언트 사이드에서 사용 (브라우저)
export { createClient as createBrowserClient } from './client';

// 서버 사이드에서 사용 (API 라우트, getServerSideProps)
export { createClient as createServerClient, createSSRClient } from './server';

// 미들웨어에서 사용
export { updateSession } from './middleware';

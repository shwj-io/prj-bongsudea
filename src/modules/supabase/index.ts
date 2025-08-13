// Supabase 클라이언트 및 유틸리티 (클라이언트 사이드)
export { supabase, supabaseReq, handleSupabaseError } from './client';

// Supabase 서버 클라이언트 (API 라우트용)
export {
  createSupabaseServerReq,
  handleSupabaseServerError,
} from './server-client';

// 인증 서비스
export { authService } from './auth';
export type { AuthUser, SignUpData, SignInData } from './auth';

// Issues 서비스
export { issuesService } from './issues';
export type { Issue, CreateIssueData, UpdateIssueData } from './issues';

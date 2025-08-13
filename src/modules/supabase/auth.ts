import { supabase, handleSupabaseError } from './client';
import { useUserStore } from '@/store/user';

// 인증 관련 타입 정의
export interface AuthUser {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface SignUpData {
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// 인증 서비스
export const authService = {
  // 회원가입
  async signUp(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // 회원가입 성공 시 사용자 정보 저장
      if (data.user && data.session) {
        useUserStore
          .getState()
          .saveUser(data.session.access_token, data.user.email || '');
      }

      return data;
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // 이메일 로그인
  async signInWithEmail(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // 로그인 성공 시 사용자 정보 저장
      if (data.user && data.session) {
        useUserStore
          .getState()
          .saveUser(data.session.access_token, data.user.email || '');
      }

      return data;
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Google 로그인
  async signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // GitHub 로그인
  async signInWithGithub() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // 로그아웃
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      // 로그아웃 시 사용자 정보 제거
      useUserStore.getState().removeUser();

      return { success: true };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // 비밀번호 재설정 요청
  async resetPassword(email: string) {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // 비밀번호 업데이트
  async updatePassword(password: string) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // 현재 사용자 정보 조회
  async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) throw error;
      return user;
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // 현재 세션 조회
  async getCurrentSession() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;
      return session;
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // 인증 상태 변경 리스너
  onAuthStateChange(callback: (event: string, session: unknown) => void) {
    return supabase.auth.onAuthStateChange((_event, _session) => {
      callback(_event, _session);
    });
  },

  // 관리자 권한 확인 (기존 API와 호환성을 위해)
  async getAdministrative() {
    try {
      // Supabase에서는 사용자 메타데이터나 별도 테이블에서 관리자 권한을 확인
      const user = await this.getCurrentUser();

      if (!user) throw new Error('User not authenticated');

      // 예시: user_metadata에서 role 확인
      const isAdmin = user.user_metadata?.role === 'admin';

      return { isAdmin, user };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },
};

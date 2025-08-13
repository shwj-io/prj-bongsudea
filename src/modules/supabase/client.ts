import { createBrowserClient } from '@/utils/supabase';
import { useUserStore } from '@/store/user';
import { PostgrestError } from '@supabase/supabase-js';

// Supabase 클라이언트 생성
export const supabase = createBrowserClient();

// 에러 핸들링 헬퍼 함수
export const handleSupabaseError = (error: PostgrestError | Error): never => {
  console.error('Supabase Error:', error);

  // 인증 에러 처리
  if (
    error?.message?.includes('JWT') ||
    ('status' in error && error.status === 401)
  ) {
    useUserStore.getState().removeUser();
    window.location.href = '/login';
  }

  throw error;
};

// Supabase 요청 래퍼
export const supabaseReq = {
  // 데이터 조회
  async select<T>(
    table: string,
    query?: string,
    options?: {
      page?: number;
      pageSize?: number;
      orderBy?: { column: string; ascending?: boolean };
    }
  ): Promise<T[]> {
    try {
      let queryBuilder = supabase.from(table).select(query || '*');

      // 정렬 옵션
      if (options?.orderBy) {
        queryBuilder = queryBuilder.order(options.orderBy.column, {
          ascending: options.orderBy.ascending ?? true,
        });
      }

      // 페이지네이션
      if (options?.page && options?.pageSize) {
        const from = (options.page - 1) * options.pageSize;
        const to = from + options.pageSize - 1;
        queryBuilder = queryBuilder.range(from, to);
      }

      const { data, error } = await queryBuilder;

      if (error) throw error;
      return data as T[];
    } catch (error) {
      return handleSupabaseError(error as PostgrestError);
    }
  },

  // 데이터 삽입
  async insert<T>(table: string, data: T | T[]): Promise<T[]> {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select();

      if (error) throw error;
      return result as T[];
    } catch (error) {
      return handleSupabaseError(error as PostgrestError);
    }
  },

  // 데이터 업데이트
  async update<T>(
    table: string,
    data: Partial<T>,
    filter: { column: string; value: unknown }
  ): Promise<T[]> {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq(filter.column, filter.value)
        .select();

      if (error) throw error;
      return result as T[];
    } catch (error) {
      return handleSupabaseError(error as PostgrestError);
    }
  },

  // 데이터 삭제
  async delete(
    table: string,
    filter: { column: string; value: unknown }
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq(filter.column, filter.value);

      if (error) throw error;
    } catch (error) {
      handleSupabaseError(error as PostgrestError);
    }
  },

  // RPC 함수 호출
  async rpc<T>(
    functionName: string,
    params?: Record<string, unknown>
  ): Promise<T> {
    try {
      const { data, error } = await supabase.rpc(functionName, params);

      if (error) throw error;
      return data as T;
    } catch (error) {
      return handleSupabaseError(error as PostgrestError);
    }
  },
};

import { supabaseReq } from './client';

// Issues 관련 타입 정의
export interface Issue {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'closed' | 'in_progress';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface CreateIssueData {
  title: string;
  description: string;
  status?: 'open' | 'closed' | 'in_progress';
  priority?: 'low' | 'medium' | 'high';
  user_id?: string;
}

export interface UpdateIssueData {
  title?: string;
  description?: string;
  status?: 'open' | 'closed' | 'in_progress';
  priority?: 'low' | 'medium' | 'high';
}

// Issues 서비스
export const issuesService = {
  // Issues 목록 조회 (페이지네이션 포함)
  async getIssues(page: number = 1, pageSize: number = 10) {
    return supabaseReq.select<Issue>('issues', '*', {
      page,
      pageSize,
      // orderBy: { column: 'created_at', ascending: false },
    });
  },

  // Issue 상세 조회
  async getIssueById(id: number) {
    const issues = await supabaseReq.select<Issue>('issues', '*');

    return issues.find(issue => issue.id === id);
  },

  // Issue 생성
  async createIssue(issueData: CreateIssueData) {
    const newIssue = {
      title: issueData.title,
      description: issueData.description,
      status: issueData.status || 'open',
      priority: issueData.priority || 'medium',
      user_id: issueData.user_id || '',
    };

    return supabaseReq.insert('issues', newIssue);
  },

  // Issue 업데이트
  async updateIssue(id: number, issueData: UpdateIssueData) {
    return supabaseReq.update<Issue>('issues', issueData, {
      column: 'id',
      value: id,
    });
  },

  // Issue 삭제
  async deleteIssue(id: number) {
    return supabaseReq.delete('issues', { column: 'id', value: id });
  },

  // 상태별 Issues 조회
  async getIssuesByStatus(status: 'open' | 'closed' | 'in_progress') {
    return supabaseReq.select<Issue>('issues', `*, status.eq.${status}`);
  },

  // 우선순위별 Issues 조회
  async getIssuesByPriority(priority: 'low' | 'medium' | 'high') {
    return supabaseReq.select<Issue>('issues', `*, priority.eq.${priority}`);
  },

  // 사용자별 Issues 조회
  async getIssuesByUser(userId: string) {
    return supabaseReq.select<Issue>('issues', `*, user_id.eq.${userId}`);
  },

  // Issue 검색
  async searchIssues(searchTerm: string) {
    return supabaseReq.select<Issue>(
      'issues',
      `*, or(title.ilike.%${searchTerm}%, description.ilike.%${searchTerm}%)`
    );
  },
};

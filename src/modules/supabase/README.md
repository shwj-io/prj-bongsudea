# Supabase 모듈 사용법

기존 API 라우터 기반 서비스를 Supabase 클라이언트로 변환한 모듈입니다.

## 파일 구조

- `client.ts` - Supabase 클라이언트 설정 및 공통 요청 래퍼
- `auth.ts` - 인증 관련 서비스 (회원가입, 로그인, 로그아웃 등)
- `issues.ts` - Issues 관련 서비스 (CRUD 작업)
- `index.ts` - 모든 서비스를 export

## 기존 코드와의 차이점

### 기존 (API 라우터 방식)

```typescript
// 기존 방식
import { axiosReq } from '@/modules/service/axios';
import { loginEmail, signUp } from '@/modules/service/auth';
import { getIssues } from '@/modules/service/issues';

// 사용
const result = await loginEmail(email, password);
const issues = await getIssues(1, 10);
```

### 새로운 (Supabase 방식)

```typescript
// 새로운 방식
import { authService, issuesService } from '@/modules/supabase';

// 사용
const result = await authService.signInWithEmail(email, password);
const issues = await issuesService.getIssues(1, 10);
```

## 사용 예시

### 1. 인증 서비스

```typescript
import { authService } from '@/modules/supabase';

// 회원가입
const signUpResult = await authService.signUp(email, password);

// 이메일 로그인
const signInResult = await authService.signInWithEmail(email, password);

// Google 로그인
const googleResult = await authService.signInWithGoogle();

// GitHub 로그인
const githubResult = await authService.signInWithGithub();

// 로그아웃
await authService.signOut();

// 비밀번호 재설정
await authService.resetPassword(email);

// 비밀번호 업데이트
await authService.updatePassword(newPassword);

// 현재 사용자 정보
const user = await authService.getCurrentUser();

// 인증 상태 변경 리스너
const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session);
});
```

### 2. Issues 서비스

```typescript
import { issuesService, Issue, CreateIssueData } from '@/modules/supabase';

// Issues 목록 조회 (페이지네이션)
const issues = await issuesService.getIssues(1, 10);

// Issue 상세 조회
const issue = await issuesService.getIssueById(1);

// Issue 생성
const newIssue: CreateIssueData = {
  title: '새로운 이슈',
  description: '이슈 설명',
  status: 'open',
  priority: 'high'
};
const createdIssue = await issuesService.createIssue(newIssue);

// Issue 업데이트
await issuesService.updateIssue(1, { status: 'closed' });

// Issue 삭제
await issuesService.deleteIssue(1);

// 상태별 조회
const openIssues = await issuesService.getIssuesByStatus('open');

// 우선순위별 조회
const highPriorityIssues = await issuesService.getIssuesByPriority('high');

// 사용자별 조회
const userIssues = await issuesService.getIssuesByUser('user-id');

// 검색
const searchResults = await issuesService.searchIssues('버그');
```

### 3. 직접 Supabase 클라이언트 사용

```typescript
import { supabase, supabaseReq } from '@/modules/supabase';

// 직접 Supabase 클라이언트 사용
const { data, error } = await supabase
  .from('custom_table')
  .select('*')
  .eq('status', 'active');

// 공통 요청 래퍼 사용
const results = await supabaseReq.select('custom_table', '*', {
  page: 1,
  pageSize: 20,
  orderBy: { column: 'created_at', ascending: false }
});
```

## 에러 처리

모든 서비스는 자동으로 에러를 처리합니다:

- 인증 에러 (401, JWT 관련): 자동으로 사용자 스토어에서 제거하고 로그인 페이지로 리디렉션
- 기타 에러: 콘솔에 로그 출력 후 에러를 다시 throw

```typescript
try {
  const result = await authService.signInWithEmail(email, password);
} catch (error) {
  // 에러는 이미 처리되었지만 추가 처리가 필요한 경우
  console.error('로그인 실패:', error);
}
```

## 마이그레이션 가이드

### 1. 기존 import 변경

```typescript
// 기존
import { loginEmail, signUp, logout } from '@/modules/service/auth';
import { getIssues } from '@/modules/service/issues';

// 새로운
import { authService, issuesService } from '@/modules/supabase';
```

### 2. 함수 호출 변경

```typescript
// 기존
const result = await loginEmail(email, password);
const issues = await getIssues(page, pageSize);

// 새로운
const result = await authService.signInWithEmail(email, password);
const issues = await issuesService.getIssues(page, pageSize);
```

### 3. 데이터베이스 테이블 구조

Issues 테이블이 다음과 같은 구조를 가져야 합니다:

```sql
CREATE TABLE issues (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('open', 'closed', 'in_progress')) DEFAULT 'open',
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 환경 변수

`.env.local` 파일에 다음 환경 변수가 설정되어 있어야 합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

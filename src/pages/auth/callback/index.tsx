import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/modules/supabase/client';
import { useUserStore } from '@/store/user';

export default function AuthCallback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { saveUser } = useUserStore();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // URL에서 파라미터 추출
        const { error: errorParam } = router.query;
        console.log('router.query:', router.query);

        // 에러가 있으면 로그인 페이지로 리다이렉트
        if (errorParam) {
          console.error('OAuth 에러:', errorParam);
          setError('로그인 중 오류가 발생했습니다.');
          setTimeout(() => {
            router.push('/login?error=oauth_failed');
          }, 2000);
          return;
        }

        // 현재 세션 확인 (Supabase가 자동으로 OAuth 코드를 처리함)
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        console.log('현재 세션:', session);
        console.log('세션 에러:', sessionError);

        if (sessionError) {
          console.error('세션 조회 에러:', sessionError);
          setError('세션을 가져오는데 실패했습니다.');
          setTimeout(() => {
            router.push('/login?error=session_failed');
          }, 2000);
          return;
        }

        // 세션이 있으면 사용자 정보 저장
        if (session && session.user) {
          console.log('OAuth 로그인 성공:', session.user.email);

          // Zustand 스토어에 사용자 정보 저장
          saveUser(session.access_token, session.user.email || '');

          // 메인 페이지로 리다이렉트
          router.push('/');
        } else {
          // 세션이 없으면 잠시 기다렸다가 다시 확인
          console.log('세션이 아직 없습니다. 잠시 후 다시 확인합니다.');
          setTimeout(async () => {
            const {
              data: { session: retrySession },
            } = await supabase.auth.getSession();
            if (retrySession && retrySession.user) {
              console.log('재시도 성공:', retrySession.user.email);
              saveUser(
                retrySession.access_token,
                retrySession.user.email || ''
              );
              router.push('/');
            } else {
              setError('로그인 세션을 가져올 수 없습니다.');
              setTimeout(() => {
                router.push('/login?error=no_session');
              }, 2000);
            }
            setLoading(false);
          }, 1000);
        }
      } catch (err) {
        console.error('OAuth 콜백 처리 중 오류:', err);
        setError('로그인 처리 중 오류가 발생했습니다.');
        setTimeout(() => {
          router.push('/login?error=callback_failed');
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    // router.query가 준비되면 실행
    if (router.isReady) {
      handleAuthCallback();
    }
  }, [router.isReady, router.query, router, saveUser]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      {loading ? (
        <div>
          <div
            style={{
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3498db',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              animation: 'spin 2s linear infinite',
              margin: '0 auto 20px',
            }}
          />
          <h2>로그인 처리 중...</h2>
          <p>구글 로그인을 완료하고 있습니다. 잠시만 기다려주세요.</p>
        </div>
      ) : error ? (
        <div>
          <h2 style={{ color: '#e74c3c' }}>로그인 오류</h2>
          <p>{error}</p>
          <p>로그인 페이지로 이동합니다...</p>
        </div>
      ) : (
        <div>
          <h2 style={{ color: '#27ae60' }}>로그인 성공!</h2>
          <p>메인 페이지로 이동합니다...</p>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

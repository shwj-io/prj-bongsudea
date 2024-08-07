import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store/user';
import { createClient } from '@/utils/server';
// import Cookies from 'js-cookie';

export default function GoogleAuth() {
  const router = useRouter();
  const supabase = createClient();
  const { accessToken, saveUser, removeUser } = useUserStore(state => state);

  useEffect(() => {
    // TODO 수정 필요
    // console.log('>>>>>>>>>>>>>이동');
    // http://localhost:3000/login/googleAuth?code=7b229dba-ea40-4ec8-8fde-469dd61db0b3

    const params = new URLSearchParams(window?.location.hash.substring(1));
    const googleToken = params.get('access_token');
    const googleRefreshToken = params.get('refresh_token');

    const getUser = async () => {
      const user = await supabase.auth.getUser();
      saveUser(googleToken, user.data.user?.email);
    };

    if (googleToken) {
      getUser();
      // Cookies.set('access_token', googleToken, { expires: 0.05 });
      // Cookies.set('refresh_token', googleRefreshToken, { expires: 14 });
      router.push('/');
    } else {
      console.log('로그인 재시도하세요.');
    }
  }, []);

  return <></>;
}

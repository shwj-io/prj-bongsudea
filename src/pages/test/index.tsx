import createClient from '@/utils/createClient';
import { createSupabse } from '@/utils/server';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function TestPage() {
  // const supabase = createClient();
  const supabase = createSupabse();
  const router = useRouter();

  const loginTest = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'master12@test.com',
      password: String(123456789),
    });

    console.log('data', data);
  };
  const handleSubmit = () => {
    axios
      .post('http://localhost:3000/api/auth/reset', {
        email: 'love960217@naver.com',
      })
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const handleClick = () => {
    axios.get('http://localhost:3000/api/auth/login/google').then(res => {
      // console.log(res);
      router.push(res.data.data.url);
    });
  };
  const handlegitClick = () => {
    axios.get('http://localhost:3000/api/auth/login/github').then(res => {
      // console.log(res);
      router.push(res.data.data.url);
    });
  };

  const handleLogoutClick = () => {
    axios.get('http://localhost:3000/api/auth/logout').then(res => {
      router.push('/');
    });
  };

  const logoutTest = async () => {
    const { error } = await supabase.auth.signOut();
    console.log('error', error);
  };

  useEffect(() => {
    console.log(
      'auth',
      supabase.auth.getUser().then(res => {
        console.log('res', res);
      })
    );
  }, [loginTest, logoutTest]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/auth/user')
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, [loginTest, logoutTest]);

  return (
    <div>
      <button onClick={() => loginTest()}>로그인테스트 버튼</button>
      <button onClick={() => logoutTest()}>로그아웃 - 테스트 버튼</button>
      <button onClick={() => handleSubmit()}>리셋 버튼</button>
      <button onClick={() => handleClick()}>구글로그인</button>
      <button onClick={() => handlegitClick()}>깃허브로그인</button>
      <button onClick={() => handleLogoutClick()}>로그아웃</button>
    </div>
  );
}

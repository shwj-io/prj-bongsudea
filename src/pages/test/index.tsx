import createClient from '@/utils/createClient';
import { createSupabse } from '@/utils/server';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function TestPage() {
  // const supabase = createClient();
  const supabase = createSupabse();
  const router = useRouter();

  // console.log(
  //   'auth',
  //   supabase.auth.getUser().then(res => {
  //     console.log('res', res);
  //   })
  // );
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
  return (
    <div>
      <button onClick={() => handleSubmit()}>리셋 버튼</button>
      <button onClick={() => handleClick()}>구글로그인</button>
      <button onClick={() => handlegitClick()}>깃허브로그인</button>
      <button onClick={() => handleLogoutClick()}>로그아웃</button>
    </div>
  );
}

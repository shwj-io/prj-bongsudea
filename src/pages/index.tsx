import {} from '@/styles/home.css.ts';
import Head from 'next/head';
import Link from 'next/link';
import BasicMap from '@/components/map';
// css
import { useUserStore } from '@/store/user';
import { logout } from '@/modules/service/auth';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Home() {
  const { accessToken, username, saveUser, removeUser } = useUserStore();

  const logoutUser = async () => {
    try {
      const response = await logout();
      console.log(response);
      if (response.status === 200) {
        return alert('로그아웃 성공');
      }
    } catch (error: any) {
      if (error.status === 400) {
        return alert('로그아웃 실패');
      } else {
        throw new Error(error);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>{username}</div>
        <div>{username ? '회원' : '비회원'}</div>
        <button>
          <Link href="/login">로그인</Link>
        </button>
        <button>
          <Link href="/sign-up">회원가입</Link>
        </button>
        <button>
          <Link href="/password/find">비밀번호찾기</Link>
        </button>
        <button onClick={logoutUser}>로그아웃</button>
        <BasicMap></BasicMap>
      </main>
    </>
  );
}

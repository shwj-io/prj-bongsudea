/* eslint-disable @next/next/no-img-element */
import {
  home,
  eventListContainer,
  nation,
  eventNumber,
  cardContainer,
} from '@/styles/home.css.ts';
import Head from 'next/head';
import BasicMap from '@/components/map';
// css
import { useUserStore } from '@/store/user';
import { logout } from '@/modules/service/auth';
// import { EVENT_MOCK_DATA } from '../../public/data/event';
import { getIssues, getMyAroundIssues } from '@/modules/service/issues';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import IssueCard from '@/components/card/issueCard';

export default function Home({}) {
  const { accessToken, username, saveUser, removeUser } = useUserStore();
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [myCoordinate, setMyCoordinate] = useState({
    lat: 0,
    lon: 0,
  });

  const logoutUser = async () => {
    try {
      const response = await logout();
      console.log(response);
      if (response.status === 200) {
        return alert('로그아웃 성공');
      }
      throw new Error();
    } catch (error: any) {
      if (error.status === 400) {
        return alert('로그아웃 실패');
      }
      throw new Error(error);
    }
  };

  const getMoreIssues = async (currentPage: number) => {
    try {
      const data = await getIssues(currentPage, 10); // 페이지에 따른 데이터 가져오기
      if (data.status === 200) {
        // setIssues((prevIssues: any) => [...prevIssues, ...data.data]); // 기존 데이터와 병합
        setIssues(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch more issues:', error);
    }
  };

  const getMoreMyAroundIssues = async (
    lat: number,
    lon: number,
    distance: number //TODO 추후 유저가 직접 거리 정하는 셀렉트 필요할 듯
  ) => {
    try {
      const data = await getMyAroundIssues(lon, lat, distance);

      if (data.status === 200) {
        // setIssues((prevIssues: any) => [...prevIssues, ...data.data]); // 기존 데이터와 병합
        setIssues(data.data);
        return data;
      }
    } catch (error) {
      console.error('Failed to fetch more issues:', error);
    }
  };

  useEffect(() => {
    if (!!myCoordinate.lat && !!myCoordinate.lon) {
      getMoreMyAroundIssues(myCoordinate.lat, myCoordinate.lon, 500);
    }
  }, [myCoordinate.lat, myCoordinate.lon]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={home}>
        {/* <div>{username}</div>
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
        <button onClick={logoutUser}>로그아웃</button> */}
        <BasicMap locationData={issues} setMyCoordinate={setMyCoordinate} />
        <div className={eventListContainer}>
          <div className={nation}>Korea</div>
          <div className={eventNumber}>
            사건, 사고 : {issues?.total ? issues?.total : issues.length}개
          </div>
          {issues.length > 0 ? (
            <div className={cardContainer}>
              {issues?.map((event, idx) => {
                return (
                  <IssueCard
                    key={event.id}
                    event={event}
                    onFetchMore={() => setPage(prev => prev + 1)}
                    isLastEvent={issues.length - 1 === idx}
                  />
                );
              })}
            </div>
          ) : (
            <div>근처에 사건 사고가 없네용~~</div>
          )}
        </div>
      </main>
    </>
  );
}

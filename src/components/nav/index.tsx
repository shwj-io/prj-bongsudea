/* eslint-disable @next/next/no-img-element */
import useForm from '@/hooks/useForm.ts';
import {
  nav,
  searchContainer,
  searchInput,
  iconButton,
  userButton,
} from './style.css.ts';
import { loginEmail, logout } from '@/modules/service/auth.ts';
import { searchValidation } from '@/modules/function/validation.ts';
import { getReady } from '@/modules/function/common.ts';
import Modal from '../modal/index.tsx';
import { useUserStore } from '@/store/user.ts';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
// css

const NAV_NON_MEMBER_MODAL_DATA = [
  { id: 1, type: 'link', text: 'login', link: '/login' },
  { id: 2, type: 'link', text: 'sign up', link: '/sign-up' },
  { id: 3, type: 'link', text: 'find password', link: '/password/find' },
];

type NavProps = {
  // arr: any;
  // onClick: any;
};

export default function Nav({}: NavProps) {
  const initValue = { search: '' };
  const { accessToken, username, saveUser, removeUser } = useUserStore();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const router = useRouter();

  const logoutUser = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        removeUser();
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

  const NAV_MEMBER_MODAL_DATA = [
    { id: 1, type: 'func', text: 'logout', func: logoutUser },
    { id: 2, type: 'link', text: 'find password', link: '/password/find' },
    { id: 3, type: 'func', text: 'my page', func: getReady },
    // { id: 3, type: 'link', text: 'my page', link: '/mypage' },
    { id: 4, type: 'func', text: 'posting', func: getReady },
    // { id: 4, type: 'link', text: 'posting', link: "/post" },
  ];

  const handleFormSubmit = async (value: any) => {
    try {
      const response = await loginEmail(value.search, '');
      if (response.status === 200) {
        router.push('/');
        saveUser(
          Cookies.get('access_token'),
          response.user.user_metadata.username
        );
        alert('로그인 성공하였습니다.');
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const { value, errors, isLoading, handleSubmit, handleChange } = useForm({
    initValue,
    onSubmit: handleFormSubmit,
    validate: searchValidation,
  });

  return (
    <nav className={nav}>
      <form className={searchContainer}>
        {/* <button className={iconButton} onClick={handleSubmit} type="submit"> */}
        <button className={iconButton} onClick={getReady} type="button">
          <img src="/icon/search.svg" alt="search button icon" />
        </button>
        <input
          className={searchInput}
          placeholder="검색"
          type="text"
          value={value.search}
          onChange={e => handleChange(e, 'search')}
        />
      </form>

      <div className={userButton}>
        <button
          className={iconButton}
          onClick={() => setIsUserModalOpen(prev => !prev)}
          type="button"
        >
          <img src="/icon/user.svg" alt="user button icon" />
        </button>
        {isUserModalOpen && (
          <Modal
            arr={
              accessToken ? NAV_MEMBER_MODAL_DATA : NAV_NON_MEMBER_MODAL_DATA
            }
          />
        )}
      </div>
    </nav>
  );
}

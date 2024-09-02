import {
  emailLoginContainer,
  inputContainer,
  link,
  title,
  form,
  linkContainer,
  lineContainer,
  line,
  or,
  socialLoginContainer,
  emailLogin,
} from './style.css';
import BasicInput from '@/components/input';
import BasicButton from '@/components/button';
import Link from 'next/link';
// css
import useForm from '@/hooks/useForm';
import { useRouter } from 'next/router';
import { getReady } from '@/modules/function/common';
import { loginValidation } from '@/modules/function/validation';
import { loginEmail, loginGithub, loginGoogle } from '@/modules/service/auth';
import { useUserStore } from '@/store/user';
import Cookies from 'js-cookie';

export default function Login() {
  const initValue = { email: '', password: '' };
  const router = useRouter();
  const { accessToken, username, saveUser, removeUser } = useUserStore();

  const handleFormSubmit = async value => {
    try {
      const response = await loginEmail(value.email, value.password);
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
    validate: loginValidation,
  });

  const getGoogleUrl = async () => {
    try {
      const response = await loginGoogle();
      if (response.data.url) {
        router.replace(response.data.url);
        return response;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const getGithubUrl = async () => {
    try {
      const response = await loginGithub();
      if (response.data.url) {
        router.replace(response.data.url);
        return response;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <div className={emailLoginContainer}>
      <div className={emailLogin}>
        <h1 className={title}>Login</h1>
        <form method="post" onSubmit={e => handleSubmit(e)} className={form}>
          <div className={inputContainer}>
            <BasicInput
              placeholder="이메일"
              value={value.email}
              type="text"
              handleChange={e => handleChange(e, 'email')}
            />
            <BasicInput
              placeholder="비밀번호"
              value={value.password}
              type="password"
              handleChange={e => handleChange(e, 'password')}
            />
          </div>
          <BasicButton type="submit">로그인</BasicButton>
        </form>
        <div className={linkContainer}>
          <Link href="/password/find" className={link}>
            비밀번호 찾기
          </Link>
          <div>|</div>
          <Link href="/sign-up" className={link}>
            회원가입
          </Link>
        </div>
      </div>
      <div className={lineContainer}>
        <div className={line} />
        <div className={or}>또는</div>
        <div className={line} />
      </div>
      <div className={socialLoginContainer}>
        <BasicButton type="button" onClick={getGoogleUrl}>
          구글 로그인
        </BasicButton>
        <BasicButton type="button" onClick={getGithubUrl}>
          깃허브 로그인
        </BasicButton>
      </div>
    </div>
  );
}

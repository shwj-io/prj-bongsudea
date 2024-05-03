import useForm from '@/hooks/useForm';
import Link from 'next/link';
import {
  emailLoginContainer,
  inputContainer,
  link,
  form,
  linkContainer,
} from './style.css';
import BasicInput from '@/components/input';
import BasicButton from '@/components/button';
// import { loginContainer } from './style.css.ts';

export default function EmailLogin() {
  const initValue = {};
  const { formValue, handleSubmit } = useForm(initValue);

  return (
    <div className={emailLoginContainer}>
      <form method="post" onSubmit={e => handleSubmit(e)} className={form}>
        <div className={inputContainer}>
          <BasicInput placeholder="아이디" />
          <BasicInput placeholder="비밀번호" />
        </div>

        <BasicButton>로그인</BasicButton>
      </form>
      <div className={linkContainer}>
        <Link href="/findPassword" className={link}>
          비밀번호 찾기
        </Link>
        {/* <div>|</div> */}
        <Link href="/signUp" className={link}>
          회원가입
        </Link>
      </div>
    </div>
  );
}

import useForm from '@/hooks/useForm';
import Link from 'next/link';
import {
  emailLoginContainer,
  inputContainer,
  link,
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

export default function EmailLogin() {
  const initValue = { email: '', password: '' };
  const { formValue, handleSubmit } = useForm(initValue);

  return (
    <div className={emailLoginContainer}>
      <div className={emailLogin}>
        <form method="post" onSubmit={e => handleSubmit(e)} className={form}>
          <div className={inputContainer}>
            <BasicInput placeholder="이메일" />
            <BasicInput placeholder="비밀번호" />
          </div>

          <BasicButton>로그인</BasicButton>
        </form>
        <div className={linkContainer}>
          <Link href="/findPassword" className={link}>
            비밀번호 찾기
          </Link>
          <div>|</div>
          <Link href="/signUp" className={link}>
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
        <BasicButton>구글 로그인</BasicButton>
        <BasicButton>카카오 로그인</BasicButton>
      </div>
    </div>
  );
}

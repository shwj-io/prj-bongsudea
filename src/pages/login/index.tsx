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

export default function Login() {
  const initValue = { email: '', password: '' };
  const { value, handleSubmit, handleChange } = useForm(initValue);

  return (
    <div className={emailLoginContainer}>
      <div className={emailLogin}>
        <form method="post" onSubmit={e => handleSubmit(e)} className={form}>
          <div className={inputContainer}>
            <BasicInput
              placeholder="이메일"
              value={value.email}
              handleChange={e => handleChange(e, 'email')}
            />
            <BasicInput
              placeholder="비밀번호"
              value={value.password}
              handleChange={e => handleChange(e, 'password')}
            />
          </div>
          <BasicButton type="submit">로그인</BasicButton>
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
        <BasicButton type="button">구글 로그인</BasicButton>
        <BasicButton type="button">카카오 로그인</BasicButton>
      </div>
    </div>
  );
}

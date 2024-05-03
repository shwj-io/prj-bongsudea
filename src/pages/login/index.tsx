import Link from 'next/link';
import {
  LoginContainer,
  line,
  lineContainer,
  link,
  or,
  socialLoginContainer,
} from './style.css';
import BasicButton from '@/components/button';

export default function Login() {
  return (
    <div className={LoginContainer}>
      <div className={socialLoginContainer}>
        <BasicButton>구글 로그인</BasicButton>
        <BasicButton>카카오 로그인</BasicButton>
      </div>
      <div className={lineContainer}>
        <div className={line} />
        <div className={or}>또는</div>
        <div className={line} />
      </div>

      <BasicButton>
        <Link href="/login/email" className={link}>
          이메일 로그인
        </Link>
      </BasicButton>
    </div>
  );
}

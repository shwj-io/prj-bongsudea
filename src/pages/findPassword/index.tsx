import useForm from '@/hooks/useForm';
import { findPasswordContainer, form, verifyCode } from './style.css';
import BasicButton from '@/components/button';
import BasicInput from '@/components/input';

export default function FindPassword() {
  const initValue = {};
  const { formValue, handleSubmit } = useForm(initValue);

  return (
    <div className={findPasswordContainer}>
      <form method="post" onSubmit={e => handleSubmit(e)} className={form}>
        <BasicInput placeholder="이메일" />
        <div className={verifyCode}>
          <BasicInput placeholder="이메일 인증 코드" />
          <BasicButton>인증</BasicButton>
        </div>
        <BasicInput placeholder="새로운 비밀번호" />
        <BasicInput placeholder="새로운 비밀번호 확인" />
        <BasicButton>비밀번호 변경</BasicButton>
      </form>
    </div>
  );
}

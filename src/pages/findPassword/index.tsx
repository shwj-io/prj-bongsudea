import useForm from '@/hooks/useForm';
import { findPasswordContainer, form, verifyCode } from './style.css';
import BasicButton from '@/components/button';
import BasicInput from '@/components/input';

export default function FindPassword() {
  const initValue = {
    email: '',
    emailCode: '',
    password: '',
    checkPassword: '',
  };
  const { formValue, handleSubmit, handleChange } = useForm(initValue);

  return (
    <div className={findPasswordContainer}>
      <form method="post" onSubmit={e => handleSubmit(e)} className={form}>
        <BasicInput
          placeholder="이메일"
          value={formValue.email}
          handleChange={e => handleChange(e, 'email')}
        />
        <div className={verifyCode}>
          <BasicInput
            placeholder="이메일 인증 코드"
            value={formValue.emailCode}
            handleChange={e => handleChange(e, 'emailCode')}
          />
          <BasicButton>인증</BasicButton>
        </div>
        <BasicInput
          placeholder="새로운 비밀번호"
          value={formValue.password}
          handleChange={e => handleChange(e, 'password')}
        />
        <BasicInput
          placeholder="새로운 비밀번호 확인"
          value={formValue.checkPassword}
          handleChange={e => handleChange(e, 'checkPassword')}
        />
        <BasicButton>비밀번호 변경</BasicButton>
      </form>
    </div>
  );
}

import useForm from '@/hooks/useForm';
import { findPasswordContainer, title, form, verifyCode } from './style.css';
import BasicButton from '@/components/button';
import BasicInput from '@/components/input';
import { findPasswordValidation } from '@/modules/function/validation';
import { useRouter } from 'next/router';
import { resetPassword, updatePassword } from '@/modules/service/auth';

export default function FindPassword() {
  const handleFormSubmit = async value => {
    try {
      const response = await resetPassword(value.email);
      console.log('>>>>>>>response', response);
      if (response.status === 200) {
        alert('이메일에서 인증 링크를 클릭해주세요.');
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const initValue = {
    email: '',
  };
  const { value, handleSubmit, handleChange } = useForm({
    initValue,
    onSubmit: handleFormSubmit,
    validate: findPasswordValidation,
  });

  return (
    <div className={findPasswordContainer}>
      <h1 className={title}>Find Password</h1>
      <form method="post" onSubmit={e => handleSubmit(e)} className={form}>
        <BasicInput
          placeholder="이메일"
          value={value?.email}
          handleChange={e => handleChange(e, 'email')}
        />
        <BasicButton type="submit">이메일 인증</BasicButton>
      </form>
    </div>
  );
}

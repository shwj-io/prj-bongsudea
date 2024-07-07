import { findPasswordContainer, title, form } from './style.css';
import BasicInput from '@/components/input';
import BasicButton from '@/components/button';
// css
import useForm from '@/hooks/useForm';
import { resetPasswordValidation } from '@/modules/function/validation';
import { useRouter } from 'next/router';
import { updatePassword } from '@/modules/service/auth';
import { useUserStore } from '@/store/user';

export default function ResetPassword() {
  const router = useRouter();
  const { accessToken, username, saveUser, removeUser } = useUserStore();

  const handleFormSubmit = async value => {
    try {
      const response = await updatePassword(value.password);
      console.log('>>>>>>>response', response);
      if (response.status === 200) {
        alert('비밀번호 변경에 성공하여 로그인 되었습니다.');
        router.push('/');
        saveUser(response.access_token, response.user.user_metadata.username);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const initValue = {
    password: '',
    checkPassword: '',
  };
  const { value, handleSubmit, handleChange } = useForm({
    initValue,
    onSubmit: handleFormSubmit,
    validate: resetPasswordValidation,
  });

  return (
    <div className={findPasswordContainer}>
      <h1 className={title}>Find Password</h1>

      <form method="post" onSubmit={e => handleSubmit(e)} className={form}>
        <BasicInput
          placeholder="새로운 비밀번호"
          value={value?.password}
          handleChange={e => handleChange(e, 'password')}
        />
        <BasicInput
          placeholder="새로운 비밀번호 확인"
          value={value?.checkPassword}
          handleChange={e => handleChange(e, 'checkPassword')}
        />
        <BasicButton type="submit">비밀번호 변경</BasicButton>
      </form>
    </div>
  );
}

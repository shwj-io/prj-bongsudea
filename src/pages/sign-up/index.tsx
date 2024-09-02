import { title, form, selectContainer, signUpContainer } from './style.css.ts';
import BasicInput from '@/components/input/index.tsx';
import BasicButton from '@/components/button/index.tsx';
import BasicSelect from '@/components/select/index.tsx';
import { Checkbox, FormControlLabel } from '@mui/material';
// css
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import useForm from '@/hooks/useForm';
import { getAdministrative, signUp } from '../../modules/service/auth.ts';
import { signUpValidation } from '@/modules/function/validation.ts';
import { useUserStore } from '@/store/user.ts';
import Cookies from 'js-cookie';

export default function SignUp({ city }) {
  const router = useRouter();
  const { accessToken, username, saveUser, removeUser } = useUserStore();
  const initValue = {
    email: '',
    password: '',
    checkPassword: '',
    city: '',
    word: '',
  };

  const handleFormSubmit = async value => {
    try {
      const response = await signUp(value.email, value.password);
      if (response) {
        router.push('/');
        saveUser(Cookies.get('access_token'), response.username);
        return response;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const { value, errors, isLoading, handleSubmit, handleChange } = useForm({
    initValue,
    onSubmit: handleFormSubmit,
    validate: signUpValidation,
  });

  const [isChecked, setIsChecked] = useState(false);
  const wordList = city.filter(city => {
    return city.city === value.city;
  });

  const handleCheckBox = () => {
    setIsChecked(prev => !prev);
  };

  console.log(city);

  return (
    <div className={signUpContainer}>
      <h1 className={title}>Sign Up</h1>

      <form method="post" onSubmit={e => handleSubmit(e)} className={form}>
        <BasicInput
          placeholder="아이디"
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
        <BasicInput
          placeholder="비밀번호 확인"
          value={value.checkPassword}
          type="password"
          handleChange={e => handleChange(e, 'checkPassword')}
        />
        <div className={selectContainer}>
          <BasicSelect
            placeholder="시/도"
            itemList={city}
            value={value.city}
            handleChange={e => handleChange(e, 'city')}
          />
          <BasicSelect
            placeholder="군/구"
            itemList={wordList[0]?.area}
            value={value.word}
            handleChange={e => handleChange(e, 'word')}
          />
        </div>

        <FormControlLabel
          control={
            <Checkbox
              onChange={handleCheckBox}
              sx={{
                color: '#000',
                '&.Mui-checked': {
                  color: '#000',
                },
              }}
            />
          }
          label="알림 서비스에 동의합니다."
        />

        <BasicButton type="submit">회원가입</BasicButton>
      </form>
    </div>
  );
}

export const getServerSideProps = async () => {
  try {
    const administrativeData = await getAdministrative();

    return {
      props: { city: administrativeData },
    };
  } catch (err) {
    return {
      notFound: false,
    };
  }
};

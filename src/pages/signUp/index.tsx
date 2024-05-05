import useForm from '@/hooks/useForm';
import { getAdministrative } from '../api/login';
import { Checkbox, FormControlLabel } from '@mui/material';
import { form, selectContainer, signUpContainer } from './style.css.ts';
import BasicInput from '@/components/input/index.tsx';
import BasicButton from '@/components/button/index.tsx';
import BasicSelect from '@/components/select/index.tsx';
import { useState } from 'react';

export default function SignUp({ city }) {
  const initValue = {
    email: '',
    password: '',
    checkPassword: '',
    city: '',
    word: '',
  };
  const { formValue, handleSubmit, handleChange } = useForm(initValue);
  const [isChecked, setIsChecked] = useState(false);
  const wordList = city.filter(city => {
    return city.city === formValue.city;
  });

  const handleCheckBox = () => {
    setIsChecked(prev => !prev);
  };

  return (
    <div className={signUpContainer}>
      <form method="post" onSubmit={e => handleSubmit(e)} className={form}>
        <BasicInput
          placeholder="아이디"
          value={formValue.email}
          handleChange={e => handleChange(e, 'email')}
        />
        <BasicInput
          placeholder="비밀번호"
          value={formValue.password}
          handleChange={e => handleChange(e, 'password')}
        />
        <BasicInput
          placeholder="비밀번호 확인"
          value={formValue.checkPassword}
          handleChange={e => handleChange(e, 'checkPassword')}
        />
        <div className={selectContainer}>
          <BasicSelect
            placeholder="시/도"
            itemList={city}
            value={formValue.city}
            handleChange={e => handleChange(e, 'city')}
          ></BasicSelect>
          <BasicSelect
            placeholder="군/구"
            itemList={wordList[0]?.area}
            value={formValue.word}
            handleChange={e => handleChange(e, 'word')}
          ></BasicSelect>
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

        <BasicButton>회원가입</BasicButton>
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

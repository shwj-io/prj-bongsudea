import useForm from '@/hooks/useForm';
import { getAdministrative } from '../api/login';
import { Checkbox, FormControlLabel } from '@mui/material';
import { form, selectContainer, signUpContainer } from './style.css.ts';
import BasicInput from '@/components/input/index.tsx';
import BasicButton from '@/components/button/index.tsx';
import BasicSelect from '@/components/select/index.tsx';

export default function SignUp({ item }) {
  const initValue = {};
  const { formValue, handleSubmit } = useForm(initValue);
  // console.log(item);

  return (
    <div className={signUpContainer}>
      <form method="post" onSubmit={e => handleSubmit(e)} className={form}>
        <BasicInput placeholder="아이디" />
        <BasicInput placeholder="비밀번호" />
        <BasicInput placeholder="비밀번호 확인" />
        <div className={selectContainer}>
          <BasicSelect
            placeholder="시/도"
            itemList={null}
            handleChange={null}
          ></BasicSelect>
          <BasicSelect
            placeholder="군/구"
            itemList={null}
            handleChange={null}
          ></BasicSelect>
        </div>

        <FormControlLabel
          control={
            <Checkbox
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
      props: { item: administrativeData },
    };
  } catch (err) {
    return {
      notFound: false,
    };
  }
};

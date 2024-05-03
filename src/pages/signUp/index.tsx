import useForm from '@/hooks/useForm';
import { getAdministrative } from '../api/login';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { form, selectContainer, signUpContainer } from './style.css.ts';
import BasicInput from '@/components/input/index.tsx';
import BasicButton from '@/components/button/index.tsx';

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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">시/도</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="시/도"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">군/구</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="군/구"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>

        <FormControlLabel
          control={
            <Checkbox
              sx={{
                color: 'pink[800]',
                '&.Mui-checked': {
                  color: 'pink[600]',
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

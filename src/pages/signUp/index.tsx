import useForm from '@/hooks/useForm';
import { getAdministrative } from '../api/login';
import {
  Button,
  ButtonProps,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
} from '@mui/material';
import { grey } from '@mui/material/colors';
// import { loginContainer } from './style.css.ts';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: grey[100],
  backgroundColor: grey[900],
  '&:hover': {
    backgroundColor: grey[700],
  },
}));

export default function SignUp({ item }) {
  const initValue = {};
  const { formValue, handleSubmit } = useForm(initValue);
  // console.log(item);

  return (
    <div>
      <form method="post" onSubmit={e => handleSubmit(e)}>
        <TextField
          required
          id="outlined-required"
          label="아이디"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="비밀번호"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="비밀번호 확인"
          defaultValue="Hello World"
        />
        <div>
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

        <ColorButton variant="contained" color="primary">
          회원가입
        </ColorButton>
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

import useForm from '@/hooks/useForm';
import { Button, ButtonProps, TextField, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
// import { loginContainer } from './style.css.ts';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: grey[100],
  backgroundColor: grey[900],
  '&:hover': {
    backgroundColor: grey[700],
  },
}));

export default function FindPassword({ item }) {
  const initValue = {};
  const { formValue, handleSubmit } = useForm(initValue);

  return (
    <div>
      <form method="post" onSubmit={e => handleSubmit(e)}>
        <TextField
          required
          id="outlined-required"
          label="이메일"
          defaultValue="Hello World"
        />
        <div>
          <TextField
            required
            id="outlined-required"
            label="이메일 인증 코드"
            defaultValue="Hello World"
          />
          <ColorButton variant="contained" color="primary">
            인증
          </ColorButton>
        </div>
        <TextField
          required
          id="outlined-required"
          label="새로운 비밀번호"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="새로운 비밀번호 확인"
          defaultValue="Hello World"
        />

        <ColorButton variant="contained" color="primary">
          비밀번호 변경
        </ColorButton>
      </form>
    </div>
  );
}

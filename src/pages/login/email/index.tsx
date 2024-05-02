import useForm from '@/hooks/useForm';
import { Button, ButtonProps, TextField, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import Link from 'next/link';
// import { loginContainer } from './style.css.ts';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: grey[100],
  backgroundColor: grey[900],
  '&:hover': {
    backgroundColor: grey[700],
  },
}));

export default function EmailLogin() {
  const initValue = {};
  const { formValue, handleSubmit } = useForm(initValue);

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

        <ColorButton variant="contained" color="primary">
          로그인
        </ColorButton>
      </form>
      <div>
        <Link href="/findPassword">비밀번호 찾기</Link>
        <div>|</div>
        <Link href="/signUp">회원가입</Link>
      </div>
    </div>
  );
}

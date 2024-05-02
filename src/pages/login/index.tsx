import { Button, ButtonProps, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import Link from 'next/link';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: grey[100],
  backgroundColor: grey[900],
  '&:hover': {
    backgroundColor: grey[700],
  },
}));

export default function Login() {
  return (
    <div>
      <div>
        <ColorButton variant="contained" color="primary">
          구글 로그인
        </ColorButton>
        <ColorButton variant="contained" color="primary">
          카카오 로그인
        </ColorButton>
        <ColorButton variant="contained" color="primary">
          로그인
        </ColorButton>
      </div>
      <div>
        <div />
        <div>또는</div>
        <div />
      </div>

      <ColorButton variant="contained" color="primary">
        <Link href="/login/email">이메일 로그인</Link>
      </ColorButton>
    </div>
  );
}

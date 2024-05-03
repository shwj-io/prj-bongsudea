import { Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReactNode } from 'react';

type BasicButtonProps = {
  children: ReactNode;
};

export default function BasicButton({ children }: BasicButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        color: grey[100],
        backgroundColor: grey[900],
        '&:hover': {
          backgroundColor: grey[700],
        },
        padding: '16.5px 14px',
        fontSize: '15px',
      }}
    >
      {children}
    </Button>
  );
}

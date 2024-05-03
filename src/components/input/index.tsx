import { TextField } from '@mui/material';
import { grey } from '@mui/material/colors';

type BasicButtonProps = {
  placeholder: string;
};

export default function BasicInput({ placeholder }: BasicButtonProps) {
  return (
    <TextField
      required
      id="outlined-required"
      label={placeholder}
      defaultValue="Hello World"
      sx={{
        width: '100%',
        '.Mui-focused': {
          // outline: 'none',
          color: grey[900],
        },
      }}
    />
  );
}

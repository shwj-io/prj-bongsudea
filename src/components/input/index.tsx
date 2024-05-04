import { TextField } from '@mui/material';

type BasicButtonProps = {
  placeholder: string;
};

export default function BasicInput({ placeholder }: BasicButtonProps) {
  return (
    <TextField
      required
      id="outlined-required"
      label={placeholder}
      InputLabelProps={{
        style: { color: '#000' },
      }}
      sx={{
        width: '100%',
        '&.MuiFormLabel-root-MuiInputLabel-root .Mui-focused': {
          color: '#000',
        },
        '& .MuiInputLabel-outlined': {
          color: '#000',
        },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: '#000',
          },
        },
      }}
    />
  );
}

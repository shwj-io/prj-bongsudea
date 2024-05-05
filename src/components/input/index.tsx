import { TextField } from '@mui/material';

type BasicButtonProps = {
  placeholder: string;
  value: string;
  handleChange: (e) => void;
};

export default function BasicInput({
  placeholder,
  value,
  handleChange,
}: BasicButtonProps) {
  return (
    <TextField
      required
      id="outlined-required"
      label={placeholder}
      InputLabelProps={{
        style: { color: '#000' },
      }}
      value={value}
      onChange={handleChange}
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

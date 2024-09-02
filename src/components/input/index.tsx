import { TextField } from '@mui/material';

type BasicInputProps = {
  placeholder: string;
  value: string;
  type: string;
  handleChange: (e) => void;
};

export default function BasicInput({
  placeholder,
  value,
  type,
  handleChange,
}: BasicInputProps) {
  return (
    <TextField
      required
      id="outlined-required"
      label={placeholder}
      InputLabelProps={{
        style: { color: '#000' },
      }}
      type={type}
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

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type BasicSelectProps = {
  placeholder: string;
  itemList: [];
  handleChange: () => void;
};

export default function BasicSelect({
  placeholder,
  itemList,
  handleChange,
}: BasicSelectProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label" style={{ color: '#000' }}>
        {placeholder}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={age
        label={placeholder}
        // onChange={handleChange}
        sx={{
          width: '100%',

          '&.MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#C4C4C4',
            },
            '&:hover fieldset': {
              borderColor: '#000',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000',
            },
          },
        }}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}

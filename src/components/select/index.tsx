import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type BasicSelectProps = {
  placeholder: string;
  itemList: [{ city: string }];
  value: string;
  handleChange: (e) => void;
};

export default function BasicSelect({
  placeholder,
  itemList,
  value,
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
        value={value}
        label={placeholder}
        onChange={handleChange}
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
        {itemList?.map(city => {
          return (
            <MenuItem value={city.city} key={city.city + '0'}>
              {city.city}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

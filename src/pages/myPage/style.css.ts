import { style } from '@vanilla-extract/css';

export const myPage = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  gap: '50px',
});

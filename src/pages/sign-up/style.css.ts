import { style } from '@vanilla-extract/css';

export const signUpContainer = style({
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '400px',
});

export const selectContainer = style({
  display: 'flex',
  gap: '10px',
});

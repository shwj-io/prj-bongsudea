import { style } from '@vanilla-extract/css';

export const findPasswordContainer = style({
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

export const verifyCode = style({
  display: 'flex',

  alignItems: 'center',
  gap: '20px',
  width: '400px',
});

export const inputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const linkContainer = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
});

export const link = style({
  color: '#000',
});

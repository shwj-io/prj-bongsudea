import { style } from '@vanilla-extract/css';

export const emailLoginContainer = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  gap: '20px',
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  width: '400px',
});

export const inputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const linkContainer = style({
  width: '400px',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
});

export const link = style({
  color: '#000',
});

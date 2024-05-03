import { style } from '@vanilla-extract/css';

export const LoginContainer = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  gap: '30px',
});

export const socialLoginContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '400px',
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '400px',
});

export const lineContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  width: '400px',
});

export const line = style({
  width: '100%',
  borderBottom: '1px solid #000',
});

export const or = style({
  whiteSpace: 'nowrap',
});

export const link = style({
  color: '#fff',
  width: '372px',
  boxSizing: 'border-box',
});

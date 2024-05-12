import { style } from '@vanilla-extract/css';

export const emailLoginContainer = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  gap: '50px',
});

export const emailLogin = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
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
  justifyContent: 'center',
  gap: '10px',
  color: '#999999',
});

export const link = style({
  color: '#999999',
  width: '100%',
  textAlign: 'center',
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
  borderBottom: '1px solid #999999',
});

export const or = style({
  whiteSpace: 'nowrap',
  color: '#999999',
});

export const socialLoginContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '400px',
});

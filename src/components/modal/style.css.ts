import { style } from '@vanilla-extract/css';

export const modal = style({
  position: 'absolute',
  top: '60px',
  right: '3px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3)',
  borderRadius: '8px',
  overflow: 'hidden',
});

export const text = style({
  whiteSpace: 'nowrap',
  padding: '10px',
  backgroundColor: 'transparent',
  border: 0,
  fontSize: '15px',
  color: '#000',

  ':hover': {
    backgroundColor: '#000',
    color: '#fff',
  },
});

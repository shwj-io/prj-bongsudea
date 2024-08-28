import { style } from '@vanilla-extract/css';

export const nav = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  position: 'absolute',
  zIndex: '2',
  width: '50%',
  padding: '20px',
  '@media': {
    'screen and (max-width: 900px)': {
      width: '100%',
    },
  },
});

export const searchContainer = style({
  width: '100%',
  display: 'flex',
  gap: '10px',
});

export const searchInput = style({
  width: '100%',
  // maxWidth: '400px',
  padding: '15px 15px 15px 30px',
  fontSize: '15px',
  outline: 'none',
  borderRadius: '30px',
});

export const buttonContainer = style({
  display: 'flex',
  gap: '10px',
});

export const iconButton = style({
  width: '50px',
  height: '50px',
  padding: '15px',
  fontSize: '15px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  border: '1px solid #000',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const userButton = style({
  position: 'relative',
});

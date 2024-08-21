import { style } from '@vanilla-extract/css';

export const home = style({
  display: 'flex',
  justifyContent: 'center',
  height: '100%',

  '@media': {
    'screen and (max-width: 900px)': {
      flexDirection: 'column',
    },
  },
});

export const eventListContainer = style({
  width: '50%',
  height: '100%',
  maxHeight: '100vh',
  overflow: 'scroll',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  '@media': {
    'screen and (max-width: 900px)': {
      width: '100%',
    },
  },
});

export const nation = style({
  fontSize: '40px',
});

export const eventNumber = style({
  fontSize: '18px',
});

export const cardContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

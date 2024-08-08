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

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  backgroundColor: 'rgba(0,0,0,0.9)',
  borderRadius: '12px',
  padding: '20px',
  color: '#F4F7FF',
});

export const dataContainer = style({
  display: 'flex',
});

export const locationContainer = style({
  display: 'flex',
  gap: '10px',
  color: '#BCC0CF',
});
export const farFromMe = style({
  color: '#BCC0CF',
});

export const eventLocation = style({
  color: '#BCC0CF',
});

export const mainData = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
});
export const eventTextData = style({
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});
export const title = style({
  width: '100%',
  fontSize: '20px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
});

export const explain = style({
  width: '100%',
  overflow: 'hidden',
  WebkitLineClamp: 3,
  whiteSpace: 'normal',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  wordBreak: 'keep-all',
});
export const eventImage = style({
  width: '100px',
  height: '100px',
  borderRadius: '10px',
  objectFit: 'cover',
});
export const bottom = style({
  display: 'flex',
  justifyContent: 'space-between',
  color: '#BCC0CF',
});
export const updateDate = style({});
export const howManySaw = style({});
export const shareButton = style({
  color: '#BCC0CF',
  border: '0',
});

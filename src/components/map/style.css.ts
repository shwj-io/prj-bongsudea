import { style } from '@vanilla-extract/css';

export const mapContainer = style({
  width: '50%',
  height: '100%',
  position: 'relative',
  '@media': {
    'screen and (max-width: 900px)': {
      width: '100%',
    },
  },
});

export const searchContainer = style({
  position: 'absolute',
  zIndex: '2',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  padding: '20px',
});

export const searchInput = style({
  width: '100%',
  maxWidth: '400px',
  padding: '15px 15px 15px 30px',
  fontSize: '15px',
  outline: 'none',
  borderRadius: '30px',
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

export const currentLocationButton = style({
  position: 'absolute',
  zIndex: '2',
  bottom: '10px',
  right: '10px',
  backgroundColor: '#fff',
  width: '30px',
  height: '30px',
  border: '1px solid #000',
  borderRadius: '50%',
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

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

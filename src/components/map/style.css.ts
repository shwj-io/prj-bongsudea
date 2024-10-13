import { style, keyframes } from '@vanilla-extract/css';

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

// 레이더 회전 애니메이션
const rotateRadar = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

// 레이더 컨테이너
export const radarContainer = style({
  position: 'relative',
  width: '200px',
  height: '200px',
});

// 레이더
export const radarStyle = style({
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: '50%',

  '::before': {
    content: '',
    position: 'absolute',
    width: '100%',
    height: '100%',

    borderRadius: '50%',
    background:
      'conic-gradient(from 0deg, rgba(0, 0, 0, 0.5) 15deg, rgba(0, 0, 0, 0) 340deg)',
    animation: `${rotateRadar} 3s linear infinite`,
  },
});

// 가운데 파란 점
export const radarDot = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '18px',
  height: '18px',
  backgroundColor: '#007bff',
  borderRadius: '50%',
  border: '3px solid #fff',
  transform: 'translate(-50%, -50%)',
});

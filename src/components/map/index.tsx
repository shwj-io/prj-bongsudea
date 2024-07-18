import { mapContainer, currentLocationButton } from './style.css.ts';
import { useEffect, useRef, useState } from 'react';

type BasicMapProps = {};

export default function BasicMap({}: BasicMapProps) {
  const [currentLocation, setCurrentLocation] = useState();
  const mapRef = useRef(null);

  useEffect(() => {
    getCurrentLocation()
      .then(({ lat, lon }) => {
        const locPosition = new window.kakao.maps.LatLng(lat, lon);
        const options = {
          center: locPosition,
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapRef.current, options);
        setCurrentLocation(map);
        setMarker(map, locPosition, 50, '현재 위치', '/icon/mapMarker.svg');

        map.setCenter(locPosition);
        displayEvent(positions, map);
      })
      .catch(() => {
        const locPosition = new window.kakao.maps.LatLng(37.5665, 126.978);
        const options = {
          center: locPosition,
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapRef.current, options);
        map.setCenter(locPosition);
      });
  }, [mapRef.current]);

  const displayEvent = (array: any, map: any) => {
    for (var i = 0; i < array.length; i++) {
      const position = new window.kakao.maps.LatLng(array[i].x, array[i].y);
      setMarker(map, position, 20, array[i].title, '/icon/circle.svg');
    }
  };

  const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          function (error) {
            console.error('Error occurred. Error code: ' + error.code);
            reject();
          }
        );
      } else {
        reject();
      }
    });
  };

  const setMarker = (
    map: any,
    position: any,
    size: number,
    title: string,
    image: string
  ) => {
    const markSize = new window.kakao.maps.Size(size, size);
    // const imageOption = { offset: new window.kakao.maps.Point(0, 0) };

    const markerImage = new window.kakao.maps.MarkerImage(
      image,
      markSize
      // imageOption
    );

    const marker = new window.kakao.maps.Marker({
      map: map,
      position: position,
      title: title,
      image: markerImage,
    });

    marker.setMap(map);
  };

  const resetMyCurrentLocation = () => {};

  // TODO
  // 사건 위치 가져와서 맵에 뿌려주기
  // 위치 검색
  // 현재위치 이동 버튼
  // 집, 회사 등 위치 저장

  return (
    <div className={mapContainer} ref={mapRef}>
      <button onClick={null} className={currentLocationButton}>
        <img
          src="/icon/pointer.svg"
          alt="go to current location button icon"
        ></img>
      </button>
    </div>
  );
}

const positions = [
  {
    title: '카카오',
    x: 33.450705,
    y: 126.570677,
  },
  {
    title: '생태연못',
    x: 33.450936,
    y: 126.569477,
  },
  {
    title: '텃밭',
    x: 33.450879,
    y: 126.56994,
  },
  {
    title: '근린공원',
    x: 33.451393,
    y: 126.570738,
  },
];

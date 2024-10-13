/* eslint-disable @next/next/no-img-element */
import {
  mapContainer,
  currentLocationButton,
  radarContainer,
  radarStyle,
  radarDot,
} from './style.css.ts';
// css
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

type BasicMapProps = {
  locationData: any;
  setMyCoordinate: Dispatch<
    SetStateAction<{
      lat: number;
      lon: number;
    }>
  >;
};

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

export default function BasicMap({
  locationData,
  setMyCoordinate,
}: BasicMapProps) {
  const [currentLocation, setCurrentLocation] = useState();

  const mapRef = useRef(null);

  const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            setMyCoordinate({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });

            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          function (error) {
            console.error(`Error occurred. Error code: ${error.code}`);
            reject();
          }
        );
      } else {
        reject();
      }
    });
  };

  // TODO 레이더 크기 동적 반영
  // const calculateDistanceInPx = (map: any, position: any) => {
  //   const center = new window.kakao.maps.LatLng(position.lat, position.lon);

  //   // 지도상에서 500m 거리의 끝 좌표를 계산하여 픽셀 단위로 변환
  //   const distanceInPx =
  //     map.getProjection().pointFromCoords(center).x -
  //     map
  //       .getProjection()
  //       .pointFromCoords(
  //         new window.kakao.maps.LatLng(position.lat + 0.0045, position.lon)
  //       ).x;

  //   return Math.abs(distanceInPx); // 절대값을 사용해 정확한 거리 계산
  // };

  // 현재위치는 레이더로 보여주고 사건 위치는 점으로 표시
  // 레이더는 div로 사건위치는 이미지로 해봄
  const setMarker = (
    map: any,
    position: any,
    size: number,
    title: string,
    image: string,
    isCurrent: boolean = false
  ) => {
    if (isCurrent) {
      const content = document.createElement('div');
      content.className = radarContainer;

      const radar = document.createElement('div');
      radar.className = radarStyle;

      const dot = document.createElement('div');
      dot.className = radarDot;

      // TODO 레이더 크기 동적 반영
      // const distanceInPx = calculateDistanceInPx(map, position);
      // content.style.width = `${distanceInPx}px`;
      // content.style.height = `${distanceInPx}px`;

      content.appendChild(radar);
      content.appendChild(dot);

      const customOverlay = new window.kakao.maps.CustomOverlay({
        map,
        position,
        content,
        // yAnchor: 1,
      });

      customOverlay.setMap(map);
    } else {
      const markSize = new window.kakao.maps.Size(size, size);

      const markerImage = new window.kakao.maps.MarkerImage(image, markSize);

      const marker = new window.kakao.maps.Marker({
        map,
        position,
        title,
        image: markerImage,
      });

      marker.setMap(map);
    }
  };

  const displayEvent = (array: any, map: any) => {
    if (array.length === 0) return;

    for (let i = 0; i < array.length; i++) {
      const position = new window.kakao.maps.LatLng(
        array[i].location_y, // TODO x, y  바껴있음
        array[i].location_x
      );
      setMarker(map, position, 20, array[i].title, '/icon/circle.svg');
    }
  };

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
        setMarker(
          map,
          locPosition,
          50,
          '현재 위치',
          '/icon/mapMarker.svg',
          true
        );

        map.setCenter(locPosition);
        displayEvent(locationData, map);
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

  const resetMyCurrentLocation = () => {
    getCurrentLocation()
      .then(({ lat, lon }) => {
        const locPosition = new window.kakao.maps.LatLng(lat, lon);

        setMarker(
          currentLocation,
          locPosition,
          50,
          '현재 위치',
          '/icon/mapMarker.svg',
          true
        );
        currentLocation?.setCenter(locPosition);
        displayEvent(locationData, currentLocation);
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
  };

  // TODO
  // 위치 검색
  // 집, 회사 등 위치 저장

  return (
    <div className={mapContainer} ref={mapRef}>
      <button
        onClick={resetMyCurrentLocation}
        className={currentLocationButton}
        type="button"
      >
        <img src="/icon/pointer.svg" alt="go to current location button icon" />
      </button>
    </div>
  );
}

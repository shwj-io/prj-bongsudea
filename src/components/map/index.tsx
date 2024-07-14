import { mapContainer } from './style.css.ts';
import { useEffect, useRef } from 'react';

type BasicMapProps = {};

export default function BasicMap({}: BasicMapProps) {
  const mapRef = useRef();

  useEffect(() => {
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapRef.current, options);
    displayCurrentLocation(map);
  }, []);

  const displayCurrentLocation = (map: any) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lon);

          setMarker(map, locPosition);
          map.setCenter(locPosition);
        },
        function (error) {
          console.error('Error occurred. Error code: ' + error.code);
          const locPosition = new window.kakao.maps.LatLng(37.5665, 126.978);
          map.setCenter(locPosition);
        }
      );
    } else {
      const locPosition = new window.kakao.maps.LatLng(37.5665, 126.978);
      map.setCenter(locPosition);
    }
  };

  function setMarker(map: any, position: any) {
    const imageSrc = '/icon/circle.svg';
    const imageSize = new kakao.maps.Size(64, 69);
    const imageOption = { offset: new kakao.maps.Point(27, 69) };

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    const marker = new kakao.maps.Marker({
      map: map,
      position: position,
      image: markerImage,
    });

    marker.setMap(map);
  }

  // TODO
  // 현재 위치 가져오는 동안 로딩
  // 마커 이미지 변경
  // 사건 위치 가져와서 맵에 뿌려주기
  // 현재위치의 100m까지 뱅글뱅글 도는거 추가
  // 위치 검색
  // 현재위치 이동 버튼
  // 집, 회사 등 위치 저장

  return (
    <div className={mapContainer} ref={mapRef}>
      <button onClick={displayCurrentLocation}>현재위치</button>
    </div>
  );
}

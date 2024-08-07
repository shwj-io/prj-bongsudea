/* eslint-disable @next/next/no-img-element */
import {
  mapContainer,
  searchContainer,
  searchInput,
  iconButton,
  currentLocationButton,
} from './style.css.ts';
// css
import useForm from '@/hooks/useForm.ts';
import { useEffect, useRef, useState } from 'react';
import { searchValidation } from '@/modules/function/validation.ts';
import { loginEmail } from '@/modules/service/auth.ts';

type BasicMapProps = {
  locationData: any;
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

export default function BasicMap({ locationData }: BasicMapProps) {
  const [currentLocation, setCurrentLocation] = useState();
  const mapRef = useRef(null);

  const initValue = { search: '' };

  const handleFormSubmit = async value => {
    try {
      const response = await loginEmail(value.search, '');
      if (response) {
        console.log(response);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const { value, errors, isLoading, handleSubmit, handleChange } = useForm({
    initValue,
    onSubmit: handleFormSubmit,
    validate: searchValidation,
  });

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
            console.error(`Error occurred. Error code: ${error.code}`);
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
      map,
      position,
      title,
      image: markerImage,
    });

    marker.setMap(map);
  };

  const displayEvent = (array: any, map: any) => {
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
        setMarker(map, locPosition, 50, '현재 위치', '/icon/mapMarker.svg');

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
          '/icon/mapMarker.svg'
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
      <form className={searchContainer}>
        <input
          className={searchInput}
          placeholder="검색"
          type="text"
          value={value.search}
          onChange={e => handleChange(e, 'password')}
        />
        <button className={iconButton} onClick={handleSubmit} type="submit">
          <img src="/icon/search.svg" alt="search button icon" />
        </button>
        <button className={iconButton} type="button">
          <img src="/icon/user.svg" alt="search button icon" />
        </button>
      </form>
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

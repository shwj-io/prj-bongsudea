const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

export const getDistanceFromLatLonInKm = (
  curLat: number,
  curLon: number,
  issueLat: number,
  issueLon: number
) => {
  const R = 6371; // 지구의 반지름 (km)
  const dLat = deg2rad(issueLat - curLat); // 위도 차이
  const dLon = deg2rad(issueLon - curLon); // 경도 차이
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(curLat)) *
      Math.cos(deg2rad(issueLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // 두 좌표 사이의 거리 (km)
  return distance;
};

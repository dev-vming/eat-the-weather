import { GeoCoordinates } from "@/application/usecases/region/dto/KakaoLocationDto";

export default async function geoFindMe() {
  return new Promise<{latitude: number, longitude: number}>((resolve, reject) => {
    function success(position: { coords: GeoCoordinates }) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      resolve({ latitude, longitude }); // 위도와 경도를 resolve
    }

    function error() {
      reject("위치 정보를 가져올 수 없습니다."); // 에러 발생 시 reject
    }

    if (!navigator.geolocation) {
      reject("브라우저에서 Geolocation을 지원하지 않습니다.");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  });
}
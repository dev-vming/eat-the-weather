import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const { response } = error;

    if (!response) {
      alert("네트워크 오류");
      return Promise.reject(error);
    }

    const { status } = response;

    switch (status) {
      case 400:
        alert("잘못된 요청입니다");
        break;
      case 401:
        alert("인증이 필요합니다");
        break;
      case 403:
        alert("접근 권한이 없습니다");
        break;
      case 500:
        alert("서버 오류입니다");
        break;
      default:
        alert("알 수 없는 오류입니다");
    }

    return Promise.reject(error);
  }
);
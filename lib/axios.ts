import { useUserStore } from '@/store/userStore';
import axios from 'axios';

interface RefreshResponse {
  accessToken: string;
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

// axios 요청 시 토큰 헤더 자동 설정
api.interceptors.request.use((config) => {
  const accessToken =
    localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});


api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // 로그인 시 잘못된 정보로 401 에러가 발생한 경우 무한 refresh 방지
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (error.response.data?.message === '잘못된 비밀번호입니다.' || error.response.data?.message === '등록되지 않은 이메일입니다.') {
        localStorage.clear();
        sessionStorage.clear();
        return Promise.reject(error);
      }

      // refreshToken을 사용한 재시도
      const refreshToken =
        localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');

      try {
        const res = await api.post<RefreshResponse>('/auth/refresh', { refreshToken });
        const newAccessToken = res.data.accessToken;

        if (localStorage.getItem('refreshToken')) {
          localStorage.setItem('accessToken', newAccessToken);
        } else {
          sessionStorage.setItem('accessToken', newAccessToken);
        }

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        // refresh 실패 시 로그아웃 처리
        localStorage.clear();
        sessionStorage.clear();
        useUserStore.getState().clearUser();
        useUserStore.getState().setPersistMode('pre-signup');
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // 그 외의 에러는 그대로 반환
  }
);
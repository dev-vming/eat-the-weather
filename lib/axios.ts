import axios from 'axios';
import { useUserStore } from '@/store/userStore';

// 타입 안전하게 선언 (axios.d.ts에서 불러오는 대신)
type CustomRequestConfig = Parameters<typeof axios.request>[0];

interface RefreshResponse {
  accessToken: string;
}

// 공통 API 인스턴스 생성
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

// 요청 인터셉터: accessToken이 있으면 Authorization 헤더에 추가
api.interceptors.request.use((config: CustomRequestConfig) => {
  const accessToken =
    localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터: accessToken 만료 시 refreshToken으로 갱신
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config as CustomRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (
        error.response.data?.message === '잘못된 비밀번호입니다.' ||
        error.response.data?.message === '등록되지 않은 이메일입니다.'
      ) {
        localStorage.clear();
        sessionStorage.clear();
        return Promise.reject(error);
      }

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

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        sessionStorage.clear();
        useUserStore.getState().clearUser();
        useUserStore.getState().setPersistMode('pre-login');
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
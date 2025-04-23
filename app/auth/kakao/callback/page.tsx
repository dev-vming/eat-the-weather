'use client';

import { api } from '@/lib/axios';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) return;

    const login = async () => {
      try {
        const res = await api.post<Tokens>('/auth/kakao/login', { code });
        const { accessToken, refreshToken } = res.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        router.replace('/');
        
      } catch (err: any) {
        if (err.response?.data?.message === '존재하지 않는 이메일입니다.') {
          // 신규 유저 - 회원가입
          try {
            const signupRes = await api.post('/auth/kakao/signup', { code });
            if (signupRes.status === 200) {
              router.replace('/onboarding');
            }
          } catch (signupErr) {
            alert('회원가입 실패');
            router.replace('/auth/login');
          }
        } else {
          alert(err.response?.data?.message || '카카오 로그인 실패');
          router.replace('/auth/login');
        }
      }
    };

    login();
  }, [code, router]);

  return <p className="text-center mt-10">카카오 로그인 중입니다...</p>;
}
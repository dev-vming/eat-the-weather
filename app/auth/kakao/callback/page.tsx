'use client';

import { api } from '@/lib/axios';
import { useUserStore } from '@/store/userStore';
import { User } from '@supabase/supabase-js';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface KakaoLoginRes {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const from = searchParams.get('state'); 
  const { setTempUser } = useUserStore();

  useEffect(() => {
    if (!code || !from) return;

    const handleKakao = async () => {
      try {
        const res = await api.post<KakaoLoginRes>('/auth/kakao', {
          code,
          from,
        });
        

        if (from === 'login') {
          const { user, accessToken, refreshToken } = res.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          const userRes = await api.get<User>(`/user/${user.email}`);

          useUserStore
            .getState()
            .setUser({ ...userRes.data, isAuthenticated: true });
          useUserStore.getState().setPersistMode('post-signup');

          alert('로그인 성공!');
          router.push('/');
        }

        if (from === 'signup') {
          const { user } = res.data;
          setTempUser(user);
          router.replace('/onboarding');
        }
      } catch (err: any) {
        if (
          from === 'login' &&
          err.response?.data?.message === '존재하지 않는 이메일입니다.'
        ) {
          router.replace('/auth/sign-up');
        } else {
          alert(err.response?.data?.message || '카카오 인증 실패');
          router.replace('/auth/login');
        }
      }
    };

    handleKakao();
  }, [code, from, router]);

  return <p className="text-center mt-10">카카오 로그인 중입니다...</p>;
}

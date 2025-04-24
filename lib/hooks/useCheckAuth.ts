'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';

export const useCheckAuth = () => {
  const router = useRouter();
  const isAuthenticated = useUserStore((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      // 로그인 안 되어 있으면 로그인 페이지로 이동
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);
};

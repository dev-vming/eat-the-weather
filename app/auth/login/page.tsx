'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/axios';
import { Label } from '@/components/ui/label';
import KakaoLoginButton from '@/app/components/KakaoButton';
import { User } from '@supabase/supabase-js';
import { useUserStore } from '@/store/userStore';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const Style = {
    Input: 'w-90 h-11 m-2 md:w-90',
    Link: 'flex self-end mr-10 font-medium',
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await api.post<{ accessToken: string; refreshToken: string }>('/auth/login', {
        email,
        password,
      });

      const { accessToken, refreshToken } = res.data;

      if (remember) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      } else {
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
      }

      const userRes = await api.get<User>(`/user/${email}`);
      
      useUserStore.getState().setUser({...userRes.data,isAuthenticated:true});
      useUserStore.getState().setPersistMode('post-onboarding');

      alert('로그인 성공!');
      router.push('/');
    } catch (error: any) {
      alert(error.response?.data?.message || '로그인 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="justify-center items-center flex flex-col h-screen w-full">
      <img src="/logoImg.png" alt="Logo" className="w-auto h-65 md:h-80" />

      <Input
        type="email"
        placeholder="이메일을 입력하세요."
        className={Style.Input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        placeholder="비밀번호를 입력하세요."
        className={Style.Input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex items-center w-90 justify-between py-2">
        <div className="flex items-center space-x-2">
          <input
            id="remember"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <Label htmlFor="remember" className="text-sm text-gray-500">
            로그인 상태 유지
          </Label>
        </div>
      </div>

      <Button
        variant="ghost"
        className="w-100 h-11 m-2 bg-blue-900 text-white md:w-90"
        onClick={handleLogin}
        disabled={loading || !email || !password}
      >
        이메일 로그인
      </Button>

      <KakaoLoginButton state={"login"} />

      <Link href="/auth/sign-up" className={Style.Link}>
        회원가입
      </Link>
    </div>
  );
}

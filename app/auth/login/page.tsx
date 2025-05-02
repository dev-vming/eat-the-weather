'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/axios';
import { Label } from '@/components/ui/label';
import KakaoLoginButton from '@/app/components/KakaoButton';
import { useUserStore } from '@/store/userStore';
import { User } from '@/domain/entities/User';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = passwordRegex.test(password);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await api.post<{ accessToken: string; refreshToken: string }>(
        '/auth/login',
        {
          email,
          password,
        }
      );

      const { accessToken, refreshToken } = res.data;

      if (remember) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      } else {
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
      }

      const userRes = await api.get<User>(`/user/${email}`);

      useUserStore
        .getState()
        .setUser({ ...userRes.data, isAuthenticated: true });
      useUserStore.getState().setPersistMode('post-login');

      alert('로그인 성공!');
      router.push('/');
    } catch (error: any) {
      alert(error.response?.data?.message || '로그인 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="px-4 py-6">
        <h1 className="text-lg font-bold">로그인</h1>
      </div>
      <div className='flex flex-col justify-center items-center mt-20'>
        <img src="/logoImg.png" alt="Logo" className="w-auto h-65 md:h-80" />

        <Input
          type="email"
          placeholder="이메일을 입력하세요."
          className={`w-90 h-11 m-2 md:w-90 ${!isEmailValid && email ? 'ring-2 ring-red-300 focus-visible:ring-red-300 bg-red-50' : 'bg-gray-100'}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isEmailValid && email && (
          <p className="text-sm text-red-300 -mt-1 flex self-start ml-15">
            올바른 이메일 형식이 아닙니다.
          </p>
        )}

        <Input
          type="password"
          placeholder="비밀번호를 입력하세요."
          className={`w-90 h-11 m-2 md:w-90 ${!isPasswordValid && password ? 'ring-2 ring-red-300 focus-visible:ring-red-300 bg-red-50' : 'bg-gray-100'}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isPasswordValid && password && (
          <p className="text-red-300 text-sm -mt-1">
            비밀번호는 8자리 이상, 숫자와 특수문자를 포함해야 합니다.
          </p>
        )}

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
          disabled={loading || !isEmailValid || !password || !isPasswordValid}
        >
          이메일 로그인
        </Button>

        <KakaoLoginButton state="login" />

        <Link href="/auth/sign-up" className="flex self-end mr-10 font-medium">
          회원가입
        </Link>
      </div>
    </div>
  );
}

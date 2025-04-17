'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'; 
import { api } from '@/lib/axios';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const Style = {
    Input: 'w-90 h-11 m-2 md:w-90',
    Link: 'flex self-end mr-10 font-medium',
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
        remember,
      });

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
          <Label htmlFor="remember" className="text-sm">
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

      <Button variant="ghost" className="w-100 h-11 m-2 bg-amber-200 md:w-90">
        카카오 로그인
      </Button>

      <Link href="/auth/sign-up" className={Style.Link}>
        회원가입
      </Link>
    </div>
  );
}
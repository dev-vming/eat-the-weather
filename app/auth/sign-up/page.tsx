"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSignUp = async () => {
    try {
      await api.post('/auth/sign-up', {
        email,
        password,
        nickname,
        onboarding_completed: false, 
        temperature_sensitivity: 0, 
      });

      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      router.push('/auth/login');
    } catch (error: any) {
      alert(error.response?.data?.message || "회원가입 실패");
    }
  };

  return (
    <div className="justify-center items-center flex flex-col h-screen w-full">
      <div className="font-bold text-lg">회원가입</div>
      <div className="flex items-center">
        <Input
          type="email"
          placeholder="이메일을 입력하세요."
          className="flex w-65 h-11 m-2 md:w-65 bg-gray-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="outline" className="w-30 h-11 m-2 md:w-20" disabled>중복확인</Button>
      </div>
      <Input
        type="text"
        placeholder="닉네임을 입력하세요."
        className="w-90 h-11 m-2 md:w-90 bg-gray-100"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호를 입력하세요."
        className="w-90 h-11 m-2 md:w-90 bg-gray-100"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="ghost"
        className="w-100 h-11 m-2 bg-blue-900 text-white md:w-90"
        onClick={handleSignUp}
      >
        다음
      </Button>
      <Button variant="ghost" className="w-100 h-11 m-2 bg-amber-200 md:w-90">
        카카오 회원가입
      </Button>
      <Link href="/auth/login" className="font-medium">로그인</Link>
    </div>
  );
}
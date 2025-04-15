"use client";
import React from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"

export default function SignUpPage() {

  return (
    <div className="justify-center items-center flex flex-col h-screen w-full">
      <div className="font-bold text-lg">회원가입</div>
      <div className="flex items-center">
        <Input type="email" placeholder="이메일을 입력하세요."
          className="flex w-65 h-11 m-2
          md:w-65 bg-gray-100" />
        <Button variant="outline" className="w-30 h-11 m-2 md: w-20">중복확인</Button>
      </div>
      <Input type="password" placeholder="비밀번호를 입력하세요." className="w-90 h-11 m-2 md:w-90 bg-gray-100" />
      <Button variant="ghost" className="w-100 h-11 m-2 bg-blue-900 text-white md: w-90">다음</Button>
      <Button variant="ghost" className="w-100 h-11 m-2 bg-amber-200 md: w-90">카카오 회원가입</Button>
      <Link href="/auth/login" className="font-medium">로그인</Link>
    </div>
  );
}


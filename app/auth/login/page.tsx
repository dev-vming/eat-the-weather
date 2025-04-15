"use client";
import React from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const Style = {
  Input: "w-90 h-11 m-2 md:w-90",
  Link: "flex self-end mr-10 font-medium",
  };

  return (
    <div className="justify-center items-center flex flex-col h-screen w-full">
      <img src="/logoImg.png" alt="Logo" className="w-auto h-65 md:h-80" />
      <Input type="email" placeholder="이메일을 입력하세요." className={Style.Input} />
      <Input type="password" placeholder="비밀번호를 입력하세요." className={Style.Input} />
      <Button variant="ghost" className="w-100 h-11 m-2 bg-blue-900 text-white md: w-90">이메일 로그인</Button>
      <Button variant="ghost" className="w-100 h-11 m-2 bg-amber-200 md: w-90">카카오 로그인</Button>
      <Link href="/auth/sign-up" className={Style.Link}>회원가입</Link>
    </div>
  );
}


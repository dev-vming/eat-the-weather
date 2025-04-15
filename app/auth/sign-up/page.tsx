"use client";
import React from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"

export default function SignUpPage() {
  const Style = {
    Input: "w-90 h-11 m-2 md:w-90 bg-gray-100",
    Link: "flex self-end mr-10 font-medium",
  };

  return (
    <div className="justify-center items-center flex flex-col h-screen w-full">
      <div className="font-bold text-lg">회원가입</div>
      <Input type="email" placeholder="이메일을 입력하세요." className={Style.Input} />
      <Button variant="outline" className="w-100 h-11 m-2 md: w-90">중복확인</Button>

      <Input type="password" placeholder="비밀번호를 입력하세요." className={Style.Input} />
      <Button variant="ghost" className="w-100 h-11 m-2 bg-blue-900 text-white md: w-90">확인</Button>
      <Button variant="ghost" className="w-100 h-11 m-2 bg-amber-200 md: w-90">카카오 회원가입</Button>
      <Link href="/auth/login" className={Style.Link}>로그인</Link>
    </div>
  );
}


"use client"

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="px-4 py-6 min-h-[calc(100vh-56px)]">
      <div>
      홈페이지
      <ul>
        <li>
          <Link href="/posts">게시판</Link>
        </li>
        <li>
          <Link href="/weather">날씨</Link>
        </li>
        <li>
          <Link href="/auth/login">로그인</Link>
        </li>
        <li>
          <Link href="/auth/sign-up">회원가입</Link>
        </li>
        <li>
          <Link href="/my-page">마이페이지</Link>
        </li>
      </ul>
    </div>
    </main>
  );
}
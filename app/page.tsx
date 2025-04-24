'use client';

import Link from 'next/link';
import { RefreshCw } from 'lucide-react';
import * as React from 'react';
import { ComboboxDemo } from './components/ComBoBox';
import { LocateFixed } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="justify-center items-center flex flex-col h-screen w-full">
      <div className="flex flex-col">
        {/* 날짜 + 새로고침 아이콘 */}
        <div className="flex self-end items-center gap-1 mr-3.5">
          <span className="text-sm">04.09 (화) 09:30 현재</span>
          <RefreshCw className="text-gray-400 w-3" />
        </div>

        {/* 위치 아이콘 + 콤보박스 */}
        <div className="flex items-center">
          <LocateFixed className="mr-2" />
          <ComboboxDemo />
        </div>
      </div>

      <div className="justify-center items-center flex flex-col">
        {/* 온도 */}
        <div className="text-6xl font-bold mt-3">10ºC</div>

        {/* 온도에 맞는 테루루 이미지 */}
        <img src="/sun.png" alt="Logo" className="w-auto h-65 md:h-80 mt-3" />

        {/* 날씨 설명 */}
        <div className="mt-4 font-bold">김유저 님, </div>
        <div className="font-bold">얇은 패딩이 어울리는 날씨에요!</div>

        {/* 게시판 버튼 */}
        <Link href="/posts">
          <Button
            variant="outline"
            className="w-100 md: w-90 h-11 m-2 mt-3 bg-red-300 rounded-4xl font-bold"
          >
            OO동 유저들의 실시간 날씨는? <br />
            N명의 유저 대화 중
          </Button>
        </Link>
      </div>
    </main>
  );
}

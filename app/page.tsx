'use client';

import Link from 'next/link';
import { RefreshCw } from 'lucide-react';
import * as React from 'react';
import { ComboboxDemo } from './components/ComBoBox';
import { LocateFixed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/userStore';
import { useCurrentWeather } from '@/lib/hooks/useWeather';
import { useAutoLocation } from '@/lib/hooks/useAutoLocation';

export default function HomePage() {
  useAutoLocation();
  const userName = useUserStore((state) => state.user.nickname);

  const { selectedWeatherRegion } = useUserStore();
  const { lat, lon } = selectedWeatherRegion ?? {};
  const { data: weather, isLoading, refetch: refetchCurrentWeather } = useCurrentWeather(lat, lon);
  const [refreshTime, setRefreshTime] = React.useState<string>('');
  const [isSpinning, setIsSpinning] = React.useState(false); // 🌀 추가

  const getNowTimeLabel = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const weekday = ['일', '월', '화', '수', '목', '금', '토'][now.getDay()];
    return `${month}.${date} (${weekday}) ${hour}:${minute} 현재`;
  };

  const handleRefreshTime = () => {
    setIsSpinning(true); // 회전 시작
    setRefreshTime(getNowTimeLabel()); // 시간 갱신
    refetchCurrentWeather();
    setTimeout(() => {
      setIsSpinning(false); // 회전 멈춤
    }, 500); // 1초 후 정지
  };
  return (
    <main className="justify-center items-center flex flex-col h-screen w-full">
      <div className="flex flex-col">
        {/* 날짜 + 새로고침 아이콘 */}
        <div className="flex self-end items-center gap-2 mr-3.5">
          <span className="text-sm">{refreshTime || getNowTimeLabel()}</span>
          <RefreshCw
            className={`text-gray-400 w-4 h-4 cursor-pointer transition-transform ${isSpinning ? 'animate-spin' : ''
              }`}
            onClick={handleRefreshTime}
          />
        </div>

          {/* 위치 아이콘 + 콤보박스 */}
          <div className="flex items-center">
            <LocateFixed className="mr-2" />
            <ComboboxDemo />
          </div>
        </div>

        <div className="justify-center items-center flex flex-col">
          {/* 온도 */}
          <div className="text-6xl font-bold mt-3">{weather?.main?.temp?.toFixed(1)}ºC</div>

          {/* 온도에 맞는 테루루 이미지 */}
          <img src="/sun.png" alt="Logo" className="w-auto h-65 md:h-80 mt-3" />

          {/* 날씨 설명 */}
          <div className="mt-4 font-bold">{userName}님, </div>
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

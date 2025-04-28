'use client';

import { useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Hourly } from './Hourly';
import { Weekly } from './Weekly';
import { ComboboxDemo } from '../components/ComBoBox';
import { useCheckAuth } from '@/lib/hooks/useCheckAuth';
import { BackButton } from '../components/BackButton';

function WeatehrPage() {
  useCheckAuth();
  
  const weekLabel = useMemo(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const firstDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    ).getDay();
    const adjustedDate = date + firstDay;
    const week = Math.ceil(adjustedDate / 7);
    return `${month}월 ${week}주`;
  }, []);

  return (
    <div className="min-h-screen w-full px-4 py-6 bg-white flex flex-col">
      <div className='flex items-center gap-4 mb-6'>
        <BackButton />
        <h1 className="text-lg font-bold">날씨</h1>
      </div>
      <Tabs defaultValue="weekly" className="w-full flex flex-col">
        <div className="flex justify-center items-center mb-4 ml-4">
          <div className="text-xl font-extrabold">{weekLabel}</div>
          <ComboboxDemo />
        </div>

        {/* 탭 선택 */}
        <TabsList className="self-center mb-4">
          <TabsTrigger className="cursor-pointer" value="weekly">주간 날씨</TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="hourly">시간대별 날씨</TabsTrigger>
        </TabsList>

        {/* 주간 날씨 */}
        <TabsContent
          value="weekly"
          className="flex-1 overflow-y-auto px-4 pb-14"
        >
          <Weekly />
        </TabsContent>

        {/* 시간대별 날씨 */}
        <TabsContent
          value="hourly"
          className="flex justify-center items-center overflow-y-auto px-4 pb-14"
        >
          <Hourly />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default WeatehrPage;

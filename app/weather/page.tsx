"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hourly } from "./Hourly";
import { Weekly } from "./Weekly";
import { ComboboxDemo } from "../components/ComBoBox";

function WeatehrPage() {
  return (
    <div className="min-h-screen w-full px-4 py-6 bg-white flex flex-col">
      <h1 className="text-lg font-bold mb-6">날씨</h1>
      <Tabs defaultValue="weekly" className="w-full flex flex-col">
        <div className="flex justify-center items-center mb-4 ml-4">
          <div className="text-xl font-extrabold">1월 1주</div>
          <ComboboxDemo />
        </div>

        {/* 탭 선택 */}
        <TabsList className="self-center mb-4">
          <TabsTrigger value="weekly">주간 날씨</TabsTrigger>
          <TabsTrigger value="hourly">시간대별 날씨</TabsTrigger>
        </TabsList>

        {/* 주간 날씨 */}
        <TabsContent value="weekly" className="flex-1 overflow-y-auto px-4 pb-14">
          <Weekly />
        </TabsContent>

        {/* 시간대별 날씨 */}
        <TabsContent value="hourly" className="flex justify-center items-center overflow-y-auto px-4 pb-14">
          <Hourly />
        </TabsContent>
      </Tabs>

    </div>
  );
}

export default WeatehrPage;

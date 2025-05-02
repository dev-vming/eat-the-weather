"use client"

import { useUserStore } from '@/store/userStore';
import { useWeather } from '@/lib/hooks/useWeather';


export function Weekly() {
    const { selectedWeatherRegion } = useUserStore();
    const { lat, lon } = selectedWeatherRegion ?? {};
    const { data: weatherData, isLoading } = useWeather(lat, lon);

    const weeklyData = weatherData?.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
    ) ?? [];

    const skeletonData = weeklyData.map((weather) => ({
        day: weather.dt_txt,
        temp_min: weather.main.temp_min + 5,
        temp_max: weather.main.temp_max + 5,
        feels_like: weather.main.feels_like + 5,
        humidity: weather.main.humidity,
        icon: weather.weather[0].icon,
    }));


    return (
        <div className="grid gap-3">
            {skeletonData.map((day, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl
                    h-[7rem]
                    p-4 shadow-md flex items-center gap-4"
                >
                    {/* 날씨 아이콘 */}
                    <div className="w-14 h-14 flex-shrink-0 mr-4">
                        <img
                            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                            alt="날씨 아이콘"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* 날짜 + 정보 */}
                    <div className="flex flex-col justify-center text-sm w-full">
                        <span className="text-gray-700 font-medium">
                            {new Date(day.day).toLocaleDateString("ko-KR", {
                                weekday: "short",
                                month: "2-digit",
                                day: "2-digit"
                            })}
                        </span>

                        <div className="mt-1 flex flex-wrap items-center text-[13px] text-gray-600 gap-x-4">
                            <span className="text-red-600 font-semibold">
                                최고: {Math.round(day.temp_max)}°
                            </span>
                            <span className="text-blue-600 font-semibold">
                                최저: {Math.round(day.temp_min)}°
                            </span>
                            <span>체감 온도: {Math.round(day.feels_like)}°</span>
                            <span>습도: {day.humidity}%</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
}
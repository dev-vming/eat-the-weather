"use client"

{/*ui 생성을 위한 더미 데이터 입니다 */}
const weeklyData = {
    "주간": "4월 4주",
    data: [
        {
            "dt_txt": "2025-04-18 00:00:00",
            "main": {
                "temp": 12.3,
                "feels_like": 11.1,
                "temp_min": 11.5,
                "temp_max": 12.8,
                "pressure": 1012,
                "humidity": 82
            },
            "weather": [
                {
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ]
        },
        {
            "dt_txt": "2025-04-19 03:00:00",
            "main": {
                "temp": 10.8,
                "feels_like": 9.7,
                "temp_min": 10.0,
                "temp_max": 11.2,
                "pressure": 1013,
                "humidity": 85
            },
            "weather": [
                {
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ]
        },
        {
            "dt_txt": "2025-04-20 06:00:00",
            "main": {
                "temp": 11.5,
                "feels_like": 10.3,
                "temp_min": 11.0,
                "temp_max": 12.0,
                "pressure": 1014,
                "humidity": 80
            },
            "weather": [
                {
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02n"
                }
            ]
        },
        {
            "dt_txt": "2025-04-21 09:00:00",
            "main": {
                "temp": 15.6,
                "feels_like": 15.0,
                "temp_min": 14.8,
                "temp_max": 16.3,
                "pressure": 1016,
                "humidity": 70
            },
            "weather": [
                {
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ]
        },
        {
            "dt_txt": "2025-04-22 12:00:00",
            "main": {
                "temp": 19.2,
                "feels_like": 18.9,
                "temp_min": 18.5,
                "temp_max": 20.0,
                "pressure": 1018,
                "humidity": 60
            },
            "weather": [
                {
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ]

        }
    ]

}

const skeletonData = weeklyData.data.map((weather) => ({
    day: weather.dt_txt,
    temp_min: weather.main.temp_min,
    temp_max: weather.main.temp_max,
    feels_like: weather.main.feels_like,
    humidity: weather.main.humidity,
}));

export function Weekly() {
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
                            src={`https://openweathermap.org/img/wn/04d@2x.png`} // 더미 예시
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
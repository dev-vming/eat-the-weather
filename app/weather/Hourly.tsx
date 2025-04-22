"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Customized } from "recharts"

const hourlyData = [
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
    "dt_txt": "2025-04-18 03:00:00",
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
    "dt_txt": "2025-04-18 06:00:00",
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
    "dt_txt": "2025-04-18 09:00:00",
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
    "dt_txt": "2025-04-18 12:00:00",
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
  },
  {
    "dt_txt": "2025-04-18 15:00:00",
    "main": {
      "temp": 20.7,
      "feels_like": 20.1,
      "temp_min": 19.5,
      "temp_max": 21.3,
      "pressure": 1016,
      "humidity": 58
    },
    "weather": [
      {
        "main": "Rain",
        "description": "light rain",
        "icon": "10d"
      }
    ]
  },
  {
    "dt_txt": "2025-04-18 18:00:00",
    "main": {
      "temp": 17.0,
      "feels_like": 16.4,
      "temp_min": 16.0,
      "temp_max": 17.8,
      "pressure": 1013,
      "humidity": 72
    },
    "weather": [
      {
        "main": "Rain",
        "description": "moderate rain",
        "icon": "10n"
      }
    ]
  },
  {
    "dt_txt": "2025-04-18 21:00:00",
    "main": {
      "temp": 14.2,
      "feels_like": 13.3,
      "temp_min": 13.5,
      "temp_max": 14.9,
      "pressure": 1011,
      "humidity": 78
    },
    "weather": [
      {
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04n"
      }
    ]
  }
];
// 📊 차트에 맞는 데이터 가공
const chartData = hourlyData.map((item) => ({
  time: item.dt_txt.slice(11, 16),
  temp_min: item.main.temp_min,
  temp_max: item.main.temp_max
}))


const chartConfig = {
  temp_max: {
    label: "최고 기온",
    color: "hsl(var(--chart-1))"
  },
  temp_min: {
    label: "최저 기온",
    color: "hsl(var(--chart-2))"
  }
} satisfies ChartConfig

export function Hourly() {
  const [selectedHour, setSelectedHour] = useState<any | null>(
    hourlyData.find((d) => d.dt_txt.slice(11, 16) === "09:00") || null
  )
  return (
    <div className="max-w-md mx-auto w-full">
      <Card className="w-full bg-white rounded-lg border overflow-hidden">

        <ChartContainer config={chartConfig} className="h-[18rem] w-full">
          <AreaChart
            data={chartData}
            margin={{ top: 40, right: 15, left: 0, bottom: 0 }}
            onClick={(e) => {
              if (e && e.activeLabel) {
                const selected = hourlyData.find(
                  (d) => d.dt_txt.slice(11, 16) === e.activeLabel
                )
                setSelectedHour(selected)
              }
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickMargin={10}
              tickLine={false}
              axisLine={false}
              domain={["dataMin - 2", "dataMax + 2"]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="temp_min"
              type="monotone"
              fill="var(--color-blue-400)"
              stroke="var(--color-blue-800)"
              fillOpacity={0.3}

            />
            <Area
              dataKey="temp_max"
              type="monotone"
              fill="var(--color-red-400)"
              stroke="var(--color-red-700)"
              fillOpacity={0.4}

            />

            {/* 아이콘 표시 */}
            <Customized
              component={(props: any) => {
                const xScale = (Object.values(props.xAxisMap)[0] as { scale: (val: any) => number })?.scale;
                const yScale = (Object.values(props.yAxisMap)[0] as { scale: (val: any) => number })?.scale;
              
                if (typeof xScale !== "function" || typeof yScale !== "function") return null;

                return (
                  <g>
                    {chartData.map(({ time, temp_max }, index: number) => {
                      const icon = hourlyData[index].weather[0].icon;
                      const x = xScale(time);
                      const y = yScale(temp_max) - 35;

                      return (
                        <image
                          key={index}
                          href={`https://openweathermap.org/img/wn/${icon}.png`}
                          x={x - 15}
                          y={y}
                          width="30"
                          height="30"
                        />
                      );
                    })}
                  </g>
                );
              }}
            />
          </AreaChart>
        </ChartContainer>
      </Card>

      {/* 선택된 시간의 상세 정보 */}
      {selectedHour && (
        <div className="h-[12rem] mt-6 bg-slate-50 rounded-lg p-4 shadow-md 
        justify-center
        flex items-center gap-4">
          <img
            src={`https://openweathermap.org/img/wn/${selectedHour.weather[0].icon}.png`}
            alt="icon"
            className="w-[6rem] h-[6rem] mr-10 bg-sky-200 rounded-lg"
          />
          <div className="text-sm">
            <div className="font-semibold text-base mb-1">
              {selectedHour.dt_txt.slice(11, 16)} 날씨 정보
            </div>
            <div className="mt-3">🌡️ 최고: {selectedHour.main.temp_max}° / 최저: {selectedHour.main.temp_min}°</div>
            <div className="mt-3">🥶 체감 온도: {selectedHour.main.feels_like}°</div>
            <div className="mt-3">💧 습도: {selectedHour.main.humidity}%</div>          </div>
        </div>
      )}
    </div>
  )
}
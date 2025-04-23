import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { HourlyWeatherResponse, CurrentWeatherResponse } from '../types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export const useWeather = (lat?: number, lon?: number) => {
  return useQuery<HourlyWeatherResponse>({
    queryKey: ['hourlyWeather', lat, lon],
    queryFn: async () => {
      const res = await axios.get<HourlyWeatherResponse>( 
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
      );
      console.log('날씨 API 응답', res.data);
      return res.data;
    },
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 60, // 1시간 캐시
    refetchOnWindowFocus: false,
  });
};

export const useCurrentWeather = (lat?: number, lon?: number) => {
  return useQuery<CurrentWeatherResponse>({
    queryKey: ['homeWeather', lat, lon],
    queryFn: async () => {
      const res = await axios.get<CurrentWeatherResponse>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
      );
      console.log('홈 날씨 API 응답', res.data);
      return res.data;
    },
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 60, // 1시간 캐시
    refetchOnWindowFocus: false,
  });
}
export type HourlyWeatherEntry = {
    dt_txt: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  };
  
  export type HourlyWeatherResponse = {
    cod: string;
    message: number;
    cnt: number;
    list: HourlyWeatherEntry[];
    city: {
      id: number;
      name: string;
      coord: {
        lat: number;
        lon: number;
      };
      country: string;
      timezone: number;
      sunrise: number;
      sunset: number;
    };
  };

export interface CurrentWeatherResponse {
    coord: {
      lon: number;
      lat: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level?: number;
      grnd_level?: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust?: number;
    };
    clouds: {
      all: number;
    };
    rain?: {
      '1h': number;
    };
    dt: number;
    sys: {
      country: string;
      sunrise: number;
      sunset: number;
    };
    name: string;
  }
  
  
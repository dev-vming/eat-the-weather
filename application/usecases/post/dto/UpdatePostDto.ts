export interface UpdatePostRequestDto {
  post_id: string;
  content: string;
  post_image?: string | null;
  has_outfit_tag?: boolean;
  has_weather_tag?: boolean;
  user_id?: string;
  region_id?: string;
  temperature_sensitivity?: number;
}

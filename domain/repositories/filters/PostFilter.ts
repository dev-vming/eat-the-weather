export interface PostFilter {
  region_id?: string;
  user_id?: string;
  order_by?: 'created_at' | 'like_count';
  only_sensitive_match?: boolean;
  my_temperature_sensitivity?: number;
  has_outfit_tag?: boolean;
  has_weather_tag?: boolean;
  limit?: number;
  cursor?: string;
}

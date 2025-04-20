/**
 * 게시글 전체 조회 요청 시 전달하는 필터링 조건 DTO
 */
export interface PostGetAllRequestDto {
  region_id?: string;
  tag_ids?: string[];
  user_id?: string;
  order_by?: 'created_at' | 'like_count';
  ascending?: boolean;
  only_sensitive_match?: boolean;
  my_temperature_sensitivity?: number;
  has_outfit_tag?: boolean;
  has_weather_tag?: boolean;
  limit?: number;
}

/**
 * 게시글 목록 요청 시 사용하는 Query DTO입니다.
 * 클라이언트 → 서버 요청 시 쿼리스트링으로 사용되며,
 * PostFilter와 거의 동일한 구조를 가집니다.
 */
export interface GetAllPostsQueryDto {
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

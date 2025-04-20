/**
 * 게시글 생성 요청 DTO
 * - 사용자가 게시글을 작성할 때 전달되는 정보
 * - optional 필드들은 Supabase의 기본값에 의존함
 */
export interface PostCreateDto {
  user_id: string;
  region_id: string;
  content: string;
  post_image?: string | 'default';
  temperature_sensitivity: number;
  has_outfit_tag?: boolean;
  has_weather_tag?: boolean;
}

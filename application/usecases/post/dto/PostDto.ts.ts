/**
 * 게시글 생성 요청 DTO
 */
export interface CreatePostRequestDto {
  user_id: string;
  region_id: string;
  content: string;
  post_image?: string | null;
  temperature_sensitivity: number;
  has_outfit_tag: boolean;
  has_weather_tag: boolean;
}

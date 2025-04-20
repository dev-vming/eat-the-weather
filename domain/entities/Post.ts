export interface Post {
  post_id?: string; // UUID
  user_id: string; // 작성자 ID (UUID)
  region_id: string; // 지역 ID (UUID)
  content: string;
  post_image?: string | 'default'; // 게시글 이미지 URL (default는 기본 이미지)
  created_at?: Date;
  updated_at?: Date; //수정하지 않았을 시 현재날짜로 설정
  temperature_sensitivity: number; // 작성 당시 유저 민감도 type snapshot 'cold':-1 | 'neutral':0 | 'hot':1
  has_outfit_tag?: boolean;
  has_weather_tag?: boolean;
}

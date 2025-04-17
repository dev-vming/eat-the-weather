export interface Post {
  post_id: string; // UUID
  content: string;
  created_at: Date;
  updated_at: Date | null; //null일 시 수정되지 않음
  post_image: string | null; //null일 시 이미지 없음(default), 기본 이미지지
  user_id: string; // UUID
  region_id: string; // UUID
}

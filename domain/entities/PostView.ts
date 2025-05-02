/**
 * 사용자의 정보를 포함한 View입니다.
 */
export interface PostView {
  post_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  has_outfit_tag: boolean;
  has_weather_tag: boolean;
  temperature_sensitivity: number;
  post_image: string;
  like_count: number;
  has_liked: boolean; // 좋아요 여부 DB에는 없고 프론트에서만 사용
  user: {
    user_id: string;
    nickname: string;
    profile_image: string;
  };
}

/**
 * 사용자의 정보를 포함한 View입니다.
 */
export interface PostView {
  post_id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  has_outfit_tag: boolean;
  has_weather_tag: boolean;
  temperature_sensitivity: number;
  post_image: string;
  like_count: number;
  user: {
    user_id: string;
    nickname: string;
    profile_image: string;
  };
}

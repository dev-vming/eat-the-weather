export interface Comment {
  comment_id: string; // UUID
  post_id: string; // UUID
  user_id: string; // UUID
  content: string; // Text
  nickname?: string; // UI를 위한 데이터
  created_at: Date; // Date
}

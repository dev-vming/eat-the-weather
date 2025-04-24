export interface Comment {
  comment_id: string; // UUID
  post_id: string; // UUID
  user_id: string; // UUID
  content: string; // Text
  nickname: string; // String
  created_at: Date; // Date
}

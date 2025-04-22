export interface CommentDto {
  comment_id?: string; // UUID
    post_id: string; // UUID
    user_id: string; // UUID
    content: string; // Text
    created_at?: Date; // Date
}
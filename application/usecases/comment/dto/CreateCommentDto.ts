export interface CreateCommentDto {
      post_id: string; // UUID
      user_id: string; // UUID
      content: string; // Text
  }
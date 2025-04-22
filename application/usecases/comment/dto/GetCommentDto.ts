export interface GetCommentDto {
    post_id: string; // UUID
    user_id?: string; // UUID
    content?: string; // Text
    created_at?: Date; // Timestamp
}
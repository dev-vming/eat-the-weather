export interface GetCommentDto {
    post_id: string; // UUID
    user_id?: string; // UUID
    content?: string; // Text
    created_at?: Date; // Timestamp
}

export interface GetCommentViewDto {
    comment_id: string; // UUID
    post_id: string; // UUID
    user_id: string; // UUID
    nickname: string; // String
    content: string; // Text
    created_at: Date; // Timestamp
}


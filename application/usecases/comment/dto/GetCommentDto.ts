// 해당 게시물에 대한 댓글을 가져오기 위한 DTO
export interface GetCommentDto {
    post_id: string; // UUID
}

export interface GetCommentViewDto {
    comment_id: string; // UUID
    post_id: string; // UUID
    user_id: string; // UUID
    nickname: string | ""; // String
    content: string; // Text
    created_at: Date; // Timestamp
}


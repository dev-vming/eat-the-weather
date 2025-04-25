import { CommentRepository } from '@/domain/repositories/CommentRepository';
import { GetCommentViewDto, GetCommentDto } from './dto/GetCommentDto';

export const GetCommentUsecase = async (
    commentRepository: CommentRepository,
    dto: GetCommentDto
  ): Promise<GetCommentViewDto[]> => {
    const comments = await commentRepository.getCommentsPostId(dto.post_id);
  
    return comments.map((comment) => ({
      comment_id: comment.comment_id,
      nickname: comment.nickname ?? "",
      post_id: comment.post_id,
      user_id: comment.user_id,
      content: comment.content,
      created_at: comment.created_at,
    }));
  };
  

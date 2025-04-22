import { CommentRepository } from '@/domain/repositories/CommentRepository';
import { GetCommentDto } from './dto/GetCommentDto';
import { CommentDto } from './dto/CommentDto';

export const GetCommentUsecase = async (
    commentRepository: CommentRepository,
    dto: GetCommentDto
  ): Promise<CommentDto[]> => {
    const comments = await commentRepository.getCommentsPostId(dto.post_id);
  
    return comments.map((comment) => ({
      post_id: comment.post_id,
      user_id: comment.user_id,
      content: comment.content,
      created_at: comment.created_at,
    }));
  };
  

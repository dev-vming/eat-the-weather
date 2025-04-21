import { CommentRepository } from '@/domain/repositories/CommentRepository';
import { CreateCommentDto } from './dto/CreateCommentDto';
import { CommentDto } from './dto/CommentDto';

/**
 * 댓글 생성 유스케이스 함수
 * @param commentRepository - 댓글 관련 DB 작업을 수행할 Repository 구현체
 * @param dto - 댓글 생성에 필요한 데이터(post_id, user_id, content)를 담은 DTO
 * @returns 생성된 댓글 정보를 CommentDto 형식으로 반환
 */
export const CreateCommentUsecase = async (
  commentRepository: CommentRepository, // 댓글 저장을 위한 repository 주입
  dto: CreateCommentDto // 클라이언트로부터 받은 댓글 생성 입력 데이터
): Promise<CommentDto> => {
  // Repository를 통해 댓글 생성 (created_at, comment_id는 DB에서 자동 생성됨)
  const created = await commentRepository.create(dto);

  // DB에서 생성된 댓글 데이터를 기반으로 CommentDto를 구성하여 반환
  const result: CommentDto = {
    comment_id: created.comment_id,
    post_id: created.post_id,
    user_id: created.user_id,
    content: created.content,
    created_at: created.created_at,
  };

  return result;
};

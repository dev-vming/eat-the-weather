import { CommentRepository } from '../../../domain/repositories/CommentRepository';
/**
 * 댓글 삭제 유스케이스 함수
 * @param commentRepository - 댓글 관련 DB 작업을 수행할 Repository 구현체
 * @param comment_id - 삭제할 댓글의 고유 ID
 * @returns 삭제 성공 여부 (true 반환), 실패 시 예외 발생
 */
export const DeleteCommentUsecase = async (
  commentRepository: CommentRepository, // 댓글 DB 작업을 처리할 repository
  comment_id: string // 삭제 대상 댓글의 ID
): Promise<boolean> => {
  try {
    // Repository를 통해 해당 comment_id의 댓글 삭제 요청
    await commentRepository.delete(comment_id);

    // 삭제 성공 시 true 반환
    return true;
  } catch (error) {
    // 오류 발생 시 로그 출력 및 예외 던지기
    console.error('❌ 댓글 삭제 실패:', error);
    throw new Error('댓글 삭제 중 오류가 발생했습니다.');
  }
};

// application/usecases/like/RemoveLikeUsecase.ts

import { LikeRepository } from '@/domain/repositories/LikeRepository';

/**
 * 사용자가 특정 아이템에 대한 좋아요를 제거하는 유즈케이스입니다.
 *
 * - 해당 아이템에 좋아요가 존재하지 않으면 에러를 발생시킵니다.
 * - 그렇지 않으면 저장소에서 좋아요 레코드를 삭제합니다.
 *
 * @param likeRepository - LikeRepository 구현체 (의존성 주입)
 * @param userId         - 좋아요를 제거할 사용자 ID
 * @param itemId         - 좋아요를 제거할 아이템 ID
 */
export const RemoveLikeUsecase = async (
  likeRepository: LikeRepository,
  userId: string,
  itemId: string
): Promise<void> => {
  // 좋아요 존재 여부 확인
  const existingLikes = await likeRepository.getLikesByItem(itemId);
  if (!existingLikes.includes(userId)) {
    throw new Error('좋아요가 등록되지 않은 아이템입니다.');
  }

  // 좋아요 제거
  await likeRepository.removeLike(userId, itemId);
};

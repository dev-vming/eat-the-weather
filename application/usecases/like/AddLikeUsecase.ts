// application/usecases/like/AddLikeUsecase.ts

import { LikeRepository } from '@/domain/repositories/LikeRepository';

/**
 * 사용자가 특정 아이템에 좋아요를 추가하는 유즈케이스입니다.
 *
 * - 이미 좋아요를 눌렀다면 에러를 발생시킵니다.
 * - 그렇지 않으면 저장소에 좋아요 레코드를 추가합니다.
 *
 * @param likeRepository - LikeRepository 구현체 (의존성 주입)
 * @param userId         - 좋아요를 추가할 사용자 ID
 * @param itemId         - 좋아요를 추가할 아이템 ID
 */
export const AddLikeUsecase = async (
  likeRepository: LikeRepository,
  userId: string,
  itemId: string
): Promise<void> => {
  // 이미 좋아요를 눌렀는지 중복 체크
  const existingLikes = await likeRepository.getLikesByItem(itemId);
  if (existingLikes.includes(userId)) {
    throw new Error('이미 좋아요를 누른 아이템입니다.');
  }

  // 좋아요 추가
  await likeRepository.addLike(userId, itemId);
};

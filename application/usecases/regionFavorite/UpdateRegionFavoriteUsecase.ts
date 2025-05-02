import { UserRegionFavorite } from '@/domain/entities/UserRegionFavorite';
import { RegionFavoriteRepogitory } from '@/domain/repositories/RegionFavoriteRepository';

export const UpdateRegionFavoriteUsecase = async (
  repository: RegionFavoriteRepogitory,
  userId: string,
  newList: UserRegionFavorite[]
): Promise<UserRegionFavorite[]> => {
  const oldList = await repository.getByUserId(userId);
  if (!oldList) throw new Error('기존 즐겨찾기를 불러올 수 없습니다.');

  // 이전 즐겨찾기가 비어있다면 모두 추가
  if (oldList.length === 0) {
    for (const item of newList) {
      await repository.create({ ...item, user_id: userId });
    }
    const regions = await repository.getByUserId(userId);
    if (!regions) throw new Error('지역 즐겨찾기 정보를 불러올 수 없습니다.');
    return regions;
  }

  // 새로운 즐겨찾기가 비어있다면 모두 삭제
  if (newList.length === 0) {
    for (const item of oldList) {
      await repository.delete(item);
    }
    return [];
  }

  const toCreate = newList.filter(
    (newItem) =>
      !oldList.some((oldItem) => oldItem.region_id === newItem.region_id)
  );

  const toDelete = oldList.filter(
    (oldItem) =>
      !newList.some((newItem) => newItem.region_id === oldItem.region_id)
  );

  const toUpdate = newList.filter((newItem) => {
    const old = oldList.find(
      (oldItem) => oldItem.region_id === newItem.region_id
    );
    return old && old.is_primary !== newItem.is_primary;
  });

  for (const item of toCreate) {
    await repository.create({ ...item, user_id: userId });
  }

  for (const item of toDelete) {
    await repository.delete(item);
  }

  for (const item of toUpdate) {
    await repository.update({ ...item, user_id: userId });
  }

  const regions = await repository.getByUserId(userId);

  if (!regions) throw new Error('지역 즐겨찾기 정보를 불러올 수 없습니다.');

  return regions;
};

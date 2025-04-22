import { UserRegionFavorite } from '@/domain/entities/UserRegionFavorite';
import { RegionFavoriteRepogitory } from '@/domain/repositories/RegionFavoriteRepository';

export const UpdateRegionFavoriteUsecase = async (
  regionFavoriteRepository: RegionFavoriteRepogitory,
  data: UserRegionFavorite,
): Promise<UserRegionFavorite[]> => {
  const created = await regionFavoriteRepository.update(data);
  if (!created) throw new Error('즐겨찾기 수정에 실패했습니다.');
  const updated = await regionFavoriteRepository.getByUserId(data.user_id);
  if (!updated) throw new Error('즐겨찾기 불러오기를 실패했습니다.');
  return updated;
};
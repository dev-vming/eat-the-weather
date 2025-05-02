import { RegionFavoriteRepogitory } from '@/domain/repositories/RegionFavoriteRepository';
import { UserRegionFavoriteViewDto } from './dto/RegionFavoriteDto';

export const GetByUserIdRegionUsecase = async (
  regionFavoriteRepository: RegionFavoriteRepogitory,
  user_id: string,
): Promise<UserRegionFavoriteViewDto[]|null> => {
  const favorites = await regionFavoriteRepository.getByUserId(user_id);
  if (favorites===null) throw new Error('즐겨찾기 조회에 실패했습니다.');
  
  return favorites;
};
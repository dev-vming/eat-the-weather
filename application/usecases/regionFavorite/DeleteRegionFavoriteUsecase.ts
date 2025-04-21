import { UserRegionFavorite } from '@/domain/entities/UserRegionFavorite';
import { RegionFavoriteRepogitory } from '@/domain/repositories/RegionFavoriteRepository';
import { RegionFavoriteRequestDto } from './dto/RegionFavoriteDto';

export const DeleteRegionFavoriteUsecase = async (
  regionFavoriteRepository: RegionFavoriteRepogitory,
  dto: RegionFavoriteRequestDto,
): Promise<UserRegionFavorite[]|null> => {
  const deleted = await regionFavoriteRepository.delete(dto);
  if (!deleted) throw new Error('즐겨찾기 삭제에 실패했습니다.');

  const updated = await regionFavoriteRepository.getByUserId(dto.user_id);
  if (updated === null) throw new Error('즐겨찾기 불러오기를 실패했습니다.');
  
  return updated;
};
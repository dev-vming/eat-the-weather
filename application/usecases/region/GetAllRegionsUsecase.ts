import { Region } from '@/domain/entities/Region';
import { RegionRepository } from '@/domain/repositories/RegionRepository';

export const getAllRegionsUsecase = async (
  regionRespository: RegionRepository
): Promise<Region[] | null> => {
  const regions = await regionRespository.getAllRegions();
  if (!regions) throw new Error('지역 정보를 불러올 수 없습니다.');
  return regions;
};

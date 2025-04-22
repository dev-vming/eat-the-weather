import { RegionRepository } from "@/domain/repositories/RegionRepository";

export const getCoordsUsecase = async(
  regionRespository: RegionRepository,
  name: string
): Promise<{lat:number, lon:number}> => {
  const region = await regionRespository.getCoordsByName(name);
  if (!region) throw new Error('지역 정보를 불러올 수 없습니다.');
  return {
    lat: region?.lat ?? 0, 
    lon: region?.lon ?? 0, 
  };
}
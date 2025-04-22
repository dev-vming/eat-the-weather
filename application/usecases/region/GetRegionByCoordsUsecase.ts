import { CurrRegionRepository } from "@/domain/repositories/RegionRepository";
import { GeoCoordinates } from "./dto/KakaoLocationDto";

export const GetRegionByCoordsUsecase = async(
  regionRespository: CurrRegionRepository,
  coords:GeoCoordinates
): Promise<string> => {
  const region = await regionRespository.getRegionFromCoords(coords);
  if(!region) throw new Error('해당 좌표 값으로 지역명을 가져올 수 없습니다.')

  return region.region_1depth_name + " " + region.region_2depth_name;
}
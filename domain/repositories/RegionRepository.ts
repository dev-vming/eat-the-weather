import { GeoCoordinates, KaKaoRegionInfo } from "@/application/usecases/region/dto/KakaoLocationDto";
import { Region } from "../entities/Region";

export interface RegionRepository {
  getAllRegions(): Promise<Region[] | null>;
  getCoordsByName(name: string): Promise<Region | null>;
}

export interface CurrRegionRepository {
  getRegionFromCoords(coords: GeoCoordinates): Promise<KaKaoRegionInfo | null>;
}
import { Region } from "../entities/Region";

export interface RegionRepository {
  getAllRegions(): Promise<Region[]|null>;
  getCoordsByName(name: string): Promise<Region|null>;
}
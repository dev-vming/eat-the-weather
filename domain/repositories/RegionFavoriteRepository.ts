import { RegionFavoriteRequestDto, UserRegionFavoriteViewDto } from "@/application/usecases/regionFavorite/dto/RegionFavoriteDto";
import { UserRegionFavorite } from "../entities/UserRegionFavorite";

export interface RegionFavoriteRepogitory {
  create(resionFavoriteData:UserRegionFavorite): Promise<UserRegionFavorite>;
  delete(resionFavoriteDto: RegionFavoriteRequestDto): Promise<UserRegionFavorite>;
  update(resionFavoriteData: UserRegionFavorite): Promise<UserRegionFavorite>;
  getByUserId(user_id: string): Promise<UserRegionFavoriteViewDto[]|null>;
}
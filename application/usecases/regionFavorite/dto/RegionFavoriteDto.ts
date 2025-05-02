export interface RegionFavoriteRequestDto {
  user_id: string;
  region_id: string;
}

export interface UserRegionFavoriteViewDto {
  user_id: string;
  region_id: string;
  is_primary: boolean;
  region_name: string;
  lat: number;
  lon: number;
}
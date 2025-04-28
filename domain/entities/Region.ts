export interface Region {
  is_primary?: boolean;
  region_id: string; // UUID
  name: string; // Text
  lat: number; // float8
  lon: number; // float8
}

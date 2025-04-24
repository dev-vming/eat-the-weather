
import { create } from 'zustand';

type RegionData = {
  region_id: string;
  region_name: string;
  lat: number;
  lon: number;
};

type FavoriteRegionState = {
  selectedRegion: RegionData | null;
  setSelectedRegion: (region: RegionData) => void;
};

export const useFavoriteRegion = create<FavoriteRegionState>((set) => ({
  selectedRegion: null,
  setSelectedRegion: (region) => set({ selectedRegion: region }),
}));

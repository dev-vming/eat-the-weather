import { Region } from '@/domain/entities/Region';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingInfo {
  selectedRegion: Region;
  currTemperature: number;
  selectedClothes: number;
  selectedFeeling: number;
}

const defaultOnboardingInfo: OnboardingInfo = {
  selectedRegion: {
    region_id: '',
    name: '',
    lat: 0,
    lon: 0,
  },
  currTemperature: 0,
  selectedClothes: 0,
  selectedFeeling: 0,
};

type OnboardingStore = {
  onboardingInfo: OnboardingInfo;
  setOnboardingInfo: (data: Partial<OnboardingInfo>) => void;
  clearOnboardingInfo: () => void;
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      onboardingInfo: defaultOnboardingInfo,
      setOnboardingInfo: (data) =>
        set((state) => ({
          onboardingInfo: {
            ...state.onboardingInfo,
            ...data,
          },
        })),
      clearOnboardingInfo: () => set({ onboardingInfo: defaultOnboardingInfo }),
    }),
    {
      name: 'onboarding-store',
    }
  )
);
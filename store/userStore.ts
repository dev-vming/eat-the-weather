import { Region } from '@/domain/entities/Region';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  email: string;
  nickname: string;
  password: string;
  onboarding_completed: boolean;
  temperature_sensitivity: number;
  provider: string;
}

interface AdditionalInfo {
  user_id: string;
  profile_image: string;
}

interface OnboardingInfo {
  selectedRegion: Region;
  currTemperature: number;
  selectedClothes: number;
}

type User = UserInfo & AdditionalInfo;

const defaultUserInfo: UserInfo = {
  email: '',
  nickname: '',
  password: '',
  onboarding_completed: false,
  temperature_sensitivity: 0,
  provider: '',
};

const defaultOnboardingInfo: OnboardingInfo = {
  selectedRegion: {
    region_id: '',
    name: '',
    lat: 0,
    lon: 0,
  },
  currTemperature: 0,
  selectedClothes: 0,
};

const defaultUser: User = {
  ...defaultUserInfo,
  user_id: '',
  profile_image: '',
};

type UserStore = {
  tempUser: UserInfo;
  setTempUser: (data: Partial<UserInfo>) => void;
  clearTempUser: () => void;

  onboardingInfo: OnboardingInfo;
  setOnboardingInfo: (data: Partial<OnboardingInfo>) => void;
  clearOnboardingInfo: () => void;

  user: User;
  setUser: (data: Partial<User>) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      tempUser: { ...defaultUserInfo },
      setTempUser: (data) =>
        set((state) => ({
          tempUser: {
            ...state.tempUser,
            ...data,
          },
        })),
      clearTempUser: () => set({ tempUser: { ...defaultUserInfo } }),

      onboardingInfo: { ...defaultOnboardingInfo },
      setOnboardingInfo: (data) =>
        set((state) => ({
          onboardingInfo: {
            ...state.onboardingInfo,
            ...data,
          },
        })),
      clearOnboardingInfo: () =>
        set({ onboardingInfo: { ...defaultOnboardingInfo } }),

      user: { ...defaultUser },
      setUser: (data) =>
        set((state) => ({
          user: {
            ...state.user,
            ...data,
          },
        })),
      clearUser: () => set({ user: { ...defaultUser } }),
    }),
    {
      name: 'user-store',
      partialize: (state) =>
        ({
          tempUser: state.tempUser,
          onboardingInfo: state.onboardingInfo,
          user: state.user,
        } as Partial<UserStore>),
    }
  )
);

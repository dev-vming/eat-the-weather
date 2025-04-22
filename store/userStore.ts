import { Region } from '@/domain/entities/Region';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  email: string;
  nickname: string;
  password?: string;
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
  selectedFeeling: number;
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
  selectedFeeling: 0,
};

const defaultUser: User = {
  ...defaultUserInfo,
  user_id: '',
  profile_image: '',
};

type PersistMode = 'pre-signup' | 'post-signup';

type UserStore = {
  persistMode: PersistMode;
  setPersistMode: (mode: PersistMode) => void;

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
      persistMode: 'pre-signup',
      setPersistMode: (mode) => set({ persistMode: mode }),
    }),
    {
      name: 'user-store',
      storage: {
        getItem: (name) => {
          if (typeof window === 'undefined') return null;
          const raw = localStorage.getItem(name);
          return raw ? JSON.parse(raw) : null;
        },
        setItem: (name, value) => {
          const parsed = JSON.parse(
            typeof value === 'string' ? value : JSON.stringify(value)
          );
          const mode: PersistMode = parsed.state?.persistMode;
        
          const base = { version: parsed.version };
        
          let stateToStore: Partial<UserStore> = { persistMode: mode };
        
          if (mode === 'post-signup') {
            stateToStore = {
              user: parsed.state.user,
              persistMode: 'post-signup',
            };
          } else {
            stateToStore = {
              tempUser: parsed.state.tempUser,
              onboardingInfo: parsed.state.onboardingInfo,
              persistMode: 'pre-signup',
            };
          }
        
          localStorage.setItem(
            name,
            JSON.stringify({
              ...base,
              state: stateToStore,
            })
          );
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

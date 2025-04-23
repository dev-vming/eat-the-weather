import { Region } from '@/domain/entities/Region';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  email: string;
  nickname: string;
  provider: string;
  profile_image: string;
  onboarding_completed: boolean;
  temperature_sensitivity: number;
}

interface CommonUserInfo {
  user_id: string;
  isAuthenticated: boolean;
}

interface OnboardingInfo {
  selectedRegion: Region;
  currTemperature: number;
  selectedClothes: number;
  selectedFeeling: number;
}

type User = UserInfo & CommonUserInfo;

// 회원가입 이후 온보딩 이후 업데이트 할 정보 초기값
const defaultTempUser: CommonUserInfo = {
  user_id: '',
  isAuthenticated: false,
};

// 온보딩 중 받아오는 정보 초기값
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

// 사용자가 로그인 후 받아오는 유저 정보 초기값
const defaultUser: User = {
  ...defaultTempUser,
  email: '',
  nickname: '',
  provider: '',
  profile_image: '',
  onboarding_completed: false,
  temperature_sensitivity: 0,
};

type PersistMode = 'pre-onboarding' | 'post-onboarding';

type UserStore = {
  persistMode: PersistMode;
  setPersistMode: (mode: PersistMode) => void;

  tempUser: CommonUserInfo;
  setTempUser: (data: Partial<CommonUserInfo>) => void;
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
      tempUser: { ...defaultTempUser },
      setTempUser: (data) =>
        set((state) => ({
          tempUser: {
            ...state.tempUser,
            ...data,
          },
        })),
      clearTempUser: () => set({ tempUser: { ...defaultTempUser } }),

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
      persistMode: 'pre-onboarding',
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
        
          if (mode === 'post-onboarding') {
            stateToStore = {
              user: parsed.state.user,
              persistMode: 'post-onboarding',
            };
          } else {
            stateToStore = {
              tempUser: parsed.state.tempUser,
              onboardingInfo: parsed.state.onboardingInfo,
              persistMode: 'pre-onboarding',
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
      partialize: (state) => {
        // persistMode에 따른 최소한의 상태만 저장하도록 설정
        if (state.persistMode === 'post-onboarding') {
          return {
            user: state.user,
            persistMode: state.persistMode,
          } as UserStore;
        } else {
          return {
            tempUser: state.tempUser,
            onboardingInfo: state.onboardingInfo,
            persistMode: state.persistMode,
          } as UserStore;
        }
      },
    }
  )
);
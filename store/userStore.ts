import { Region } from '@/domain/entities/Region';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CommonUserInfo {
  user_id: string;
  isAuthenticated: boolean;
}

interface UserInfo {
  email: string;
  nickname: string;
  provider: string;
  profile_image: string;
  onboarding_completed: boolean;
  temperature_sensitivity: number;
}

type User = CommonUserInfo & UserInfo;

const defaultTempUser: CommonUserInfo = {
  user_id: '',
  isAuthenticated: false,
};

const defaultUser: User = {
  ...defaultTempUser,
  email: '',
  nickname: '',
  provider: '',
  profile_image: '',
  onboarding_completed: false,
  temperature_sensitivity: 0,
};

type PersistMode = 'pre-login' | 'post-login';

type UserStore = {
  persistMode: PersistMode;
  setPersistMode: (mode: PersistMode) => void;

  tempUser: CommonUserInfo;
  setTempUser: (data: Partial<CommonUserInfo>) => void;
  clearTempUser: () => void;

  user: User;
  setUser: (data: Partial<User>) => void;
  clearUser: () => void;

  selectedWeatherRegion: Region | null;
  setSelectedWeatherRegion: (region: Region) => void;

  initialRegion: Region | null;
  setInitialRegion: (region: Region) => void;
  clearInitialRegion: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      tempUser: defaultTempUser,
      setTempUser: (data) =>
        set((state) => ({
          tempUser: { ...state.tempUser, ...data },
        })),
      clearTempUser: () => set({ tempUser: defaultTempUser }),

      user: defaultUser,
      setUser: (data) =>
        set((state) => ({
          user: { ...state.user, ...data },
        })),
      clearUser: () => set({ user: defaultUser }),

      persistMode: 'pre-login',
      setPersistMode: (mode) => set({ persistMode: mode }),

      selectedWeatherRegion: null,
      setSelectedWeatherRegion: (region) =>
        set(() => ({ selectedWeatherRegion: region })),

      initialRegion: null,
      setInitialRegion: (region) =>
        set(() => ({ initialRegion: region })),
      
      clearInitialRegion: () =>
        set(() => ({ initialRegion: null })),

    }),

    
    {
      name: 'user-store',
      partialize: (state) => {
        if (state.persistMode === 'post-login') {
          return {
            user: state.user,
            selectedWeatherRegion: state.selectedWeatherRegion,
            initialRegion: state.initialRegion,
            persistMode: state.persistMode,
          };
        } else {
          return {
            tempUser: state.tempUser,
            persistMode: state.persistMode,
          };
        }
      },
    }
  )
);
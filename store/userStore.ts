import { create } from 'zustand';

interface UserInfo {
  email: string;
  nickname: string;
  password: string;
  onboarding_completed: boolean;
  temperature_sensitivity: number;
  provider: string;
  selectedClothes?: number;
}

interface AdditionalInfo {
  user_id: string;
  profile_image: string;
}

type User = UserInfo & AdditionalInfo;

type UserStore = {
  // 회원가입 - 온보딩용 임시 유저 정보 저장
  tempUser: UserInfo;
  setTempUser: (data: Partial<UserInfo>) => void;
  clearTempUser: () => void;

  // 회원가입 완료 후 전체 유저 정보 저장
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  tempUser: {
    email: '',
    nickname: '',
    password: '',
    onboarding_completed: false,
    temperature_sensitivity: 0,
    provider: '',
    selectedClothes: 0,
  },
  setTempUser: (data) =>
    set((state) => ({
      tempUser: {
        ...state.tempUser,
        ...data,
      },
    })),
  clearTempUser: () =>
    set({
      tempUser: {
        email: '',
        nickname: '',
        password: '',
        onboarding_completed: false,
        temperature_sensitivity: 0,
        provider: '',
        selectedClothes: 0,
      },
    }),

  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
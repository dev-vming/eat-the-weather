export interface User {
  userId: string; // UUID
  email: string;
  password: string;
  nickname: string;
  onboardingCompleted: boolean;
  temperatureSetting: number;
  profileImage: string;
  provider: string;
}

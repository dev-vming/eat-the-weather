export interface User {
  user_id: string; // UUID
  email: string;
  password?: string;
  nickname: string;
  onboarding_completed: boolean;
  temperature_sensitivity: number;
  profile_image: string;
  provider: string;
}

export interface EmailLoginRequestDto {
  email: string;
  password: string;
}

export interface SignupRequestDto {
  email: string;
  password?: string;
  nickname: string;
  profile_image?: string;
  onboarding_completed: boolean;
  temperature_sensitivity: number;
  provider: "kakao" | "email";
}


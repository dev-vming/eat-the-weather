export interface EmailLoginRequestDto {
  email: string;
  password: string;
}

export interface EmailSignupRequestDto {
  email: string;
  password: string;
  nickname: string;
  onboarding_completed: boolean;
  temperature_sensitivity: number;
  provider: "kakao" | "email";
}

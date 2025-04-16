export interface EmailLoginRequestDto {
  email: string;
  password: string;
}

export interface EmailSignupRequestDto {
  email: string;
  password: string;
  nickname: string;
  onboardingCompleted: boolean;
  temperatureSetting: number;
  provider: "kakao" | "email";
  profileImage?: string,
}


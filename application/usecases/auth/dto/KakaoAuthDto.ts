export interface KakaoProfileDto {
  email: string;
  nickname: string;
  profile_image: string;
  provider: string;
}

export interface KakaoUserDto {
  code: string;
  clientId: string;
  redirectUri: string;
}


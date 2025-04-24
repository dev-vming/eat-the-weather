import { KakaoProfileDto } from "@/application/usecases/auth/dto/KakaoAuthDto";

export interface KaKaoUserRepository {
  getKakaoToken: (code: string) => Promise<string>;
  getKakaoUserInfo: (accessToken: string) => Promise<KakaoProfileDto>;
}
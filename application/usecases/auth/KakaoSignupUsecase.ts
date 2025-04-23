import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { KkAuthRepository } from '@/infra/repositories/kakao/KkAuthRepository';
import { KakaoUserDto } from './dto/KakaoAuthDto';

export const kakaoSignupUsecase = async (
  userRepository: UserRepository,
  dto: KakaoUserDto
): Promise<{ user: User }> => {
  const kakaoUserRepository = KkAuthRepository(dto.clientId, dto.redirectUri);
  const kakaoToken = await kakaoUserRepository.getKakaoToken(dto.code);
  const kakaoUser = await kakaoUserRepository.getKakaoUserInfo(kakaoToken);

  const existinEmail = await userRepository.findByEmail(kakaoUser.email);
  if (existinEmail) throw new Error('이미 존재하는 이메일입니다.');

  const user = await userRepository.create({
    email: kakaoUser.email,
    nickname: kakaoUser.nickname,
    profile_image: kakaoUser.profile_image,
    provider: 'kakao',
    onboarding_completed: false,
    temperature_sensitivity: null,
  });

  return { user };
};

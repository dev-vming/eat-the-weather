import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { KkAuthRepository } from '@/infra/repositories/kakao/KkAuthRepository';
import { KakaoProfileDto, KakaoUserDto } from './dto/KakaoAuthDto';

export const kakaoEmailCheckUsecase = async (
  userRepository: UserRepository,
  dto: KakaoUserDto
): Promise<{ kakaoUser: KakaoProfileDto }> => {
  const kakaoUserRepository = KkAuthRepository(dto.clientId, dto.redirectUri);
  const kakaoToken = await kakaoUserRepository.getKakaoToken(dto.code);
  const kakaoUser = await kakaoUserRepository.getKakaoUserInfo(kakaoToken);

  const existinEmail = await userRepository.findByEmail(kakaoUser.email);
  if (existinEmail) throw new Error('이미 존재하는 이메일입니다.');

  return { kakaoUser };
};

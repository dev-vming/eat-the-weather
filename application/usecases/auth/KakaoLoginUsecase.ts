import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { KkAuthRepository } from '@/infra/repositories/kakao/KkAuthRepository';
import { KakaoUserDto } from './dto/KakaoAuthDto';
import { AuthToken } from '@/utils/AuthToken';

export const kakaoLoginUsecase = async (
  userRepository: UserRepository,
  dto: KakaoUserDto
): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
  const kakaoUserRepository = KkAuthRepository(dto.clientId, dto.redirectUri);
  const kakaoToken = await kakaoUserRepository.getKakaoToken(dto.code);
  const kakaoUser = await kakaoUserRepository.getKakaoUserInfo(kakaoToken);

  const user = await userRepository.findByEmail(kakaoUser.email);
  if (!user) throw new Error('존재하지 않는 이메일입니다.');

  const accessToken = AuthToken.issueAccessToken(
    user.email,
    user.nickname
  );
  const refreshToken = AuthToken.issueRefreshToken(
    user.email,
    user.nickname
  );

  return { user, accessToken, refreshToken };
};

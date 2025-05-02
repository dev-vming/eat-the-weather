import bcrypt from 'bcryptjs';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { AuthToken } from '@/utils/AuthToken';
import { EmailLoginRequestDto } from './dto/AuthDto';
import { User } from '@/domain/entities/User';

export const EmailLoginUsecase = async (
  userRepository: UserRepository,
  dto: EmailLoginRequestDto
): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
  const user = await userRepository.findByEmail(dto.email);
  if (!user) throw new Error('등록되지 않은 이메일입니다.');

  const isValidPassword = await bcrypt.compare(
    dto.password,
    user.password || ''
  );
  if (!isValidPassword) throw new Error('잘못된 비밀번호입니다.');

  const accessToken = AuthToken.issueAccessToken(user.email, user.nickname);
  const refreshToken = AuthToken.issueRefreshToken(user.email, user.nickname);

  return { user, accessToken, refreshToken };
};

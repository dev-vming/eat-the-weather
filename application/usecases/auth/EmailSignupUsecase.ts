import bcrypt from 'bcryptjs';
import { EmailSignupRequestDto } from './dto/AuthDto';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { AuthToken } from '@/utils/AuthToken';
import { User } from '@/domain/entities/User';

export const signupWithEmail = async (
  userRepository: UserRepository,
  dto: EmailSignupRequestDto
): Promise<{ user: User; token: string }> => {
  const existing = await userRepository.findByEmail(dto.email);
  if (existing) throw new Error('이미 존재하는 이메일입니다.');

  const hashed = await bcrypt.hash(dto.password, 10);
  const user = await userRepository.create({    
    email: dto.email,              
    nickname: dto.nickname,
    password: hashed,
    provider: 'email',
    onboardingCompleted: dto.onboardingCompleted,
    temperatureSetting: dto.temperatureSetting,
  });

  const token = AuthToken.issueToken(user);
  return { user, token };
};
import bcrypt from 'bcryptjs';
import { SignupRequestDto } from './dto/AuthDto';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { User } from '@/domain/entities/User';

export const EmailSignupUsecase = async (
  userRepository: UserRepository,
  dto: SignupRequestDto
): Promise<{ user: User }> => {
  const existinEmail = await userRepository.findByEmail(dto.email);
  if (existinEmail) throw new Error('이미 존재하는 이메일입니다.');

  const existinNickname = await userRepository.findByNickname(dto.nickname);
  if (existinNickname) throw new Error('이미 존재하는 닉네임입니다.');

  const hashed = await bcrypt.hash(dto.password as string, 10);
  const user = await userRepository.create({    
    email: dto.email,              
    nickname: dto.nickname,
    password: hashed,
    provider: 'email',
    onboarding_completed: dto.onboarding_completed,
    temperature_sensitivity: dto.temperature_sensitivity,
  });

  return { user };
};


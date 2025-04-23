import { SignupRequestDto } from './dto/AuthDto';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { User } from '@/domain/entities/User';

export const kakaoSignupUsecase = async (
  userRepository: UserRepository,
  dto: SignupRequestDto
): Promise<{ user: User }> => {

  const user = await userRepository.create({
    email: dto.email,              
    nickname: dto.nickname,
    provider: 'kakao',
    onboarding_completed: dto.onboarding_completed,
    temperature_sensitivity: dto.temperature_sensitivity,
    profile_image: dto.profile_image
  });

  return { user };
};
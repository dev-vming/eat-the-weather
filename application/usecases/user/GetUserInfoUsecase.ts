import { UserRepository } from '@/domain/repositories/UserRepository';
import { User } from '@/domain/entities/User';

export const GetUserInfoUsecase = async (
  userRepository: UserRepository,
  email: string
): Promise<User> => {

  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error("유저 정보가 없습니다.");

  return {
    user_id: user.user_id,
    email: user.email,
    nickname: user.nickname,
    onboarding_completed: user.onboarding_completed,
    temperature_sensitivity: user.temperature_sensitivity,
    profile_image: user.profile_image,
    provider: user.provider
  };
};

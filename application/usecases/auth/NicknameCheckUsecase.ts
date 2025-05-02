import { UserRepository } from '@/domain/repositories/UserRepository';

export const NickCheckUsecase = async (
  userRepository: UserRepository,
  nickname: string
): Promise<boolean> => {
  const user = await userRepository.findByNickname(nickname);
  return !user; 
};
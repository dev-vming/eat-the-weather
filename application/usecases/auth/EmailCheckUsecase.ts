import { UserRepository } from '@/domain/repositories/UserRepository';

export const EmailCheckUsecase = async (
  userRepository: UserRepository,
  email: string
): Promise<boolean> => {
  const user = await userRepository.findByEmail(email);
  return !user; 
};
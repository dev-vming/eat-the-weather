import { UserRepository } from '@/domain/repositories/UserRepository';

import { User } from '@/domain/entities/User';
import { UpdateUserRequestDto } from './dto/UpdateUserDto';

export const updateUserInfoUsecase = async (
  userRepository: UserRepository,
  user_id: string,
  dto: UpdateUserRequestDto
): Promise<User> => {
  const updatedUser = await userRepository.update(user_id, dto);
  return updatedUser;
};
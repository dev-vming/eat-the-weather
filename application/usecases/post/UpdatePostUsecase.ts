import { PostRepository } from '@/domain/repositories/PostRepository';
import { UpdatePostRequestDto } from './dto/UpdatePostDto';

export const UpdatePostUsecase = async (
  postRepository: PostRepository,
  dto: UpdatePostRequestDto
): Promise<void> => {
  await postRepository.update(dto);
};

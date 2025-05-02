// application/usecases/post/GetLikedPostsUsecase.ts
import { PostRepository } from '@/domain/repositories/PostRepository';
import { GetLikedPostsRequestDto } from './dto/GetLikedPostsDto';
import { PostView } from '@/domain/entities/PostView';

export const GetLikedPostsUsecase = async (
  postRepository: PostRepository,
  dto: GetLikedPostsRequestDto
): Promise<PostView[]> => {
  const posts = await postRepository.getLikedPostsByUser(dto.user_id);
  return posts;
};

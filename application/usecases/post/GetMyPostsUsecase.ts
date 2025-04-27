import { PostRepository } from '@/domain/repositories/PostRepository';
import { GetMyPostsRequestDto } from './dto/GetMyPostsDto';
import { PostView } from '@/domain/entities/PostView';

export const GetMyPostsUsecase = async (
  postRepository: PostRepository,
  dto: GetMyPostsRequestDto
): Promise<PostView[]> => {
  // 지정된 user_id로 작성한 게시물들만 조회
  const posts = await postRepository.getPostsByUser(dto.user_id);
  return posts;
};

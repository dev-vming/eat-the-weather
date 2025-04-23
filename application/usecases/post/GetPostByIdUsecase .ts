import { PostRepository } from '@/domain/repositories/PostRepository';
import { PostView } from '@/domain/entities/PostView';

/**
 * 게시글 상세 조회 유즈케이스
 * @param postRepository - PostRepository 의존성 주입
 * @param postId - 조회할 게시글 ID
 * @returns PostView 객체
 */
export const GetPostByIdUsecase = async (
  postRepository: PostRepository,
  postId: string
): Promise<PostView> => {
  const post = await postRepository.getById(postId);

  if (!post) {
    throw new Error('해당 게시글을 찾을 수 없습니다.');
  }

  return post;
};

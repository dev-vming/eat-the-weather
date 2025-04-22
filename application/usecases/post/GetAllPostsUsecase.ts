import { PostRepository } from '@/domain/repositories/PostRepository';
import { PostView } from '@/domain/entities/PostView';
import { PostFilter } from '@/domain/repositories/filters/PostFilter';

/**
 * 게시글 목록을 조회하는 유즈케이스입니다.
 * 필터 조건에 따라 게시글 목록을 조회하며,
 * 무한스크롤을 위한 커서 기반 페이징(nextCursor)도 지원합니다.
 *
 * @param postRepository PostRepository 구현체 (의존성 주입)
 * @param filter 게시글 필터 조건
 * @returns PostView 배열과 nextCursor(다음 커서)
 */
export const GetAllPostsUsecase = async (
  postRepository: PostRepository,
  filter: PostFilter
): Promise<{
  posts: PostView[];
  nextCursor: string | undefined;
}> => {
  // 게시글 목록 조회
  const posts = await postRepository.getAll(filter);

  // 다음 페이지 요청을 위한 커서 설정
  const nextCursor =
    posts.length > 0
      ? new Date(posts[posts.length - 1].createdAt).toISOString()
      : undefined;

  return {
    posts,
    nextCursor,
  };
};

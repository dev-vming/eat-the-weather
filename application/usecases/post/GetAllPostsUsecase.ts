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
  nextCursor?: string | Date;
}> => {
  const posts = await postRepository.getAll(filter);

  if (posts.length === 0) {
    return { posts, nextCursor: undefined };
  }

  const last = posts[posts.length - 1];

  // order_by에 따라 커서 생성
  const nextCursor =
    filter.order_by === 'like_count'
      ? // 인기순: like_count & created_at 복합 커서 (JSON 문자열)
        JSON.stringify({
          likeCount: last.like_count,
          createdAt: last.created_at,
        })
      : last.created_at;

  return { posts, nextCursor };
};

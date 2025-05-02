import { PostRepository } from '@/domain/repositories/PostRepository';
import { GetPostByIdRequestDto } from './dto/GetPostByIdDto';
import { PostView } from '@/domain/entities/PostView';

/**
 * 게시글 상세 조회 유즈케이스
 */
export const GetPostByIdUsecase = async (
  postRepository: PostRepository,
  dto: GetPostByIdRequestDto
): Promise<PostView> => {
  const { post_id, user_id } = dto;
  const post = await postRepository.getById(post_id, user_id);

  if (!post) {
    throw new Error('해당 게시글을 찾을 수 없습니다.');
  }

  return {
    post_id: post.post_id,
    content: post.content,
    created_at: post.created_at,
    updated_at: post.updated_at,
    has_outfit_tag: post.has_outfit_tag,
    has_weather_tag: post.has_weather_tag,
    temperature_sensitivity: post.temperature_sensitivity,
    post_image: post.post_image,
    like_count: post.like_count,
    has_liked: post.has_liked, // 좋아요 여부 DB에는 없고 프론트에서만 사용
    user: {
      user_id: post.user.user_id,
      nickname: post.user.nickname,
      profile_image: post.user.profile_image,
    },
  };
};

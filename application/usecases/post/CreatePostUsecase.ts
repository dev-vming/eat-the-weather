// application/usecases/post/CreatePostUsecase.ts

import { PostRepository } from '@/domain/repositories/PostRepository';
import { PostCreateDto } from './dto/PostCreateDto';
import { Post } from '@/domain/entities/Post';

/**
 * 게시글 생성 유즈케이스
 * - 유저 민감도와 태그 포함 여부를 포함해 게시글 생성
 *
 * @param repository 게시글 저장소 (의존성 주입)
 * @param dto 게시글 생성 정보
 * @returns 생성된 게시글(Post)
 */
export const CreatePostUsecase = async (
  repository: PostRepository,
  dto: PostCreateDto
): Promise<Post> => {
  const payload: PostCreateDto = {
    ...dto,
    post_image: dto.post_image ?? 'default',
    has_outfit_tag: dto.has_outfit_tag ?? false,
    has_weather_tag: dto.has_weather_tag ?? false,
  };

  const post = await repository.create(payload);
  return post;
};

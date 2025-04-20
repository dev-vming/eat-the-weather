// application/usecases/post/GetAllPostsUsecase.ts

import { PostRepository } from '@/domain/repositories/PostRepository';
import { Post } from '@/domain/entities/Post';
import { PostGetAllRequestDto } from './dto/PostGetAllRequestDto';
import { PostFilter } from '@/domain/repositories/filters/PostFilter';

/**
 * 게시글 필터링 조회 유즈케이스
 * - 다양한 조건으로 게시글을 필터링해서 반환
 */
export const GetAllPostsUsecase = async (
  repository: PostRepository,
  dto: PostGetAllRequestDto
): Promise<Post[]> => {
  const filter: PostFilter = {
    region_id: dto.region_id,
    tag_ids: dto.tag_ids,
    user_id: dto.user_id,
    order_by: dto.order_by,
    ascending: dto.ascending,
    only_sensitive_match: dto.only_sensitive_match,
    my_temperature_sensitivity: dto.my_temperature_sensitivity,
    has_outfit_tag: dto.has_outfit_tag,
    has_weather_tag: dto.has_weather_tag,
    limit: dto.limit,
  };

  return repository.getAll(filter);
};

// infra/repositories/supabase/SbPostRepository.ts

import { supabase } from './Sbclient';
import { PostRepository } from '@/domain/repositories/PostRepository';
import { Post } from '@/domain/entities/Post';
import { PostFilter } from '@/domain/repositories/filters/PostFilter';

/**
 * Supabase를 사용한 PostRepository 구현체
 */
export const SbPostRepository: PostRepository = {
  async create(postData) {
    const { data, error } = await supabase
      .from('post')
      .insert({
        user_id: postData.user_id,
        region_id: postData.region_id,
        content: postData.content,
        post_image: postData.post_image ?? 'default',
        temperature_sensitivity: postData.temperature_sensitivity,
        has_outfit_tag: postData.has_outfit_tag ?? false,
        has_weather_tag: postData.has_weather_tag ?? false,
      })
      .select()
      .single();

    if (error || !data) throw new Error('게시글 생성 실패');

    return {
      post_id: data.post_id,
      user_id: data.user_id,
      region_id: data.region_id,
      content: data.content,
      post_image: data.post_image,
      temperature_sensitivity: data.temperature_sensitivity,
      has_outfit_tag: data.has_outfit_tag,
      has_weather_tag: data.has_weather_tag,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  },

  async update(post: Post): Promise<void> {
    const { error } = await supabase
      .from('posts')
      .update({
        content: post.content,
        post_image: post.post_image,
        temperature_sensitivity: post.temperature_sensitivity,
        has_outfit_tag: post.has_outfit_tag,
        has_weather_tag: post.has_weather_tag,
      })
      .eq('post_id', post.post_id);

    if (error) throw new Error(`Error updating post: ${error.message}`);
  },

  async delete(postId: string): Promise<void> {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('post_id', postId);
    if (error) throw new Error(`Error deleting post: ${error.message}`);
  },

  async getById(postId: string): Promise<Post | null> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('post_id', postId)
      .single();
    if (error) throw new Error(`Error fetching post by ID: ${error.message}`);
    return data as Post | null;
  },

  async getAll(filter: PostFilter): Promise<Post[]> {
    let query = supabase.from('post').select('*');

    // 지역 필터 (예: 서울특별시 중구)
    if (filter.region_id) {
      query = query.eq('region_id', filter.region_id);
    }

    // 해시태그 필터 (ex. #옷차림, #날씨 등 복수 선택 가능)
    // post_tag 테이블을 통해 해당 태그들이 포함된 post_id만 필터링
    if (filter.tag_ids && filter.tag_ids.length > 0) {
      const postIds = await getPostIdsByTagIds(filter.tag_ids);
      query = query.in('post_id', postIds);
    }

    // 📍 내 날씨 민감도와 유사한 게시물만 보기
    // 예: 내 민감도가 2라면, 1~3 사이의 temp 민감도 게시글만 필터링
    if (
      filter.only_sensitive_match &&
      typeof filter.my_temperature_sensitivity === 'number'
    ) {
      const mySens = filter.my_temperature_sensitivity;
      query = query
        .gte('temperature_sensitivity', mySens - 1)
        .lte('temperature_sensitivity', mySens + 1);
    }

    // 정렬 기준 (ex. 최신순 or 인기순)
    // 최신순 → created_at 기준 정렬
    // 인기순 → like_count 기준 정렬
    if (filter.order_by) {
      query = query.order(filter.order_by, {
        ascending: filter.ascending ?? false,
      });
    }

    // 📍 게시물 개수 제한 (예: 10개만 불러오기)
    if (filter.limit) {
      query = query.limit(filter.limit);
    }

    const { data, error } = await query;

    if (error || !data) throw new Error('게시글 필터 조회 실패');
    return data as Post[];
  },

  async getByUserId(userId: string): Promise<Post[]> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', userId);

    if (error)
      throw new Error(`Error fetching posts by user ID: ${error.message}`);

    return data as Post[];
  },

  async getPopular(regionId?: string, limit?: number): Promise<Post[]> {
    let query = supabase.from('posts').select('*').order('like_count', {
      ascending: false,
    });

    if (regionId) {
      query = query.eq('region_id', regionId);
    }

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error)
      throw new Error(`Error fetching popular posts: ${error.message}`);

    return data as Post[];
  },
};

/**
 * 보조함수: 선택된 tag_id 들을 기준으로 해당 태그가 달린 post_id 들을 조회
 * (post_tag 테이블 사용)
 */
async function getPostIdsByTagIds(tagIds: string[]): Promise<string[]> {
  const { data, error } = await supabase
    .from('post_tag')
    .select('post_id')
    .in('tag_id', tagIds);

  if (error || !data) throw new Error('태그 기준 게시글 ID 조회 실패');

  const postIds = [...new Set(data.map((d) => d.post_id))];
  return postIds;
}

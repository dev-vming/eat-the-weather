// infra/repositories/supabase/SbPostRepository.ts

import { supabase } from './Sbclient';
import { PostRepository } from '@/domain/repositories/PostRepository';
import { Post } from '@/domain/entities/Post';
import { PostView } from '@/domain/entities/PostView';
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

  async getAll(filter: PostFilter): Promise<PostView[]> {
    let query = supabase.from('post_view').select('*');

    // 해당 지역의 게시글만 조회
    if (filter.region_id) {
      query = query.eq('region_id', filter.region_id);
    }

    // 특정 유저의 게시글만 조회 (ex. 내 게시글 보기)
    if (filter.user_id) {
      query = query.eq('user_id', filter.user_id);
    }

    // 최신순 or 인기순 정렬
    if (filter.order_by) {
      if (filter.order_by === 'created_at') {
        query = query.order('created_at', { ascending: false }); // 최신순
      } else if (filter.order_by === 'like_count') {
        query = query.order('like_count', { ascending: false }); // 인기순
      }
    }

    // 민감도 일치하는 게시글만
    if (
      filter.only_sensitive_match &&
      filter.my_temperature_sensitivity !== undefined
    ) {
      query = query.eq(
        'temperature_sensitivity',
        filter.my_temperature_sensitivity
      );
    }

    // #옷차림 태그가 있는 게시글만
    if (filter.has_outfit_tag !== undefined) {
      query = query.eq('has_outfit_tag', filter.has_outfit_tag);
    }

    // #날씨 태그가 있는 게시글만
    if (filter.has_weather_tag !== undefined) {
      query = query.eq('has_weather_tag', filter.has_weather_tag);
    }

    // 최대 조회 개수 제한 (무한스크롤 단위)
    if (filter.limit) {
      query = query.limit(filter.limit);
    }

    // 커서 기준 이전(post.created_at < cursor) 게시글만 조회 (무한스크롤)
    if (filter.cursor) {
      query = query.lt('created_at', filter.cursor);
    }

    const { data, error } = await query;

    if (error || !data) throw new Error('게시글 조회 실패');

    return data.map(
      (post): PostView => ({
        post_id: post.post_id,
        content: post.content,
        createdAt: post.created_at,
        updatedAt: post.updated_at,
        has_outfit_tag: post.has_outfit_tag,
        has_weather_tag: post.has_weather_tag,
        temperature_sensitivity: post.temperature_sensitivity,
        post_image: post.post_image,
        like_count: post.like_count,
        user: {
          user_id: post.user.user_id,
          nickname: post.user.nickname,
          profile_image: post.user.profile_image,
        },
      })
    );
  },
};

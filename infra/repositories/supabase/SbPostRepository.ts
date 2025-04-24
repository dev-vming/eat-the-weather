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
        post_image: postData.post_image ?? null,
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

    // 지역 필터
    if (filter.region_id) {
      query = query.eq('region_id', filter.region_id);
    }

    // 민감도 매칭 필터
    if (
      filter.only_sensitive_match &&
      filter.my_temperature_sensitivity != null
    ) {
      query = query.eq(
        'temperature_sensitivity',
        filter.my_temperature_sensitivity
      );
    }

    // 태그 필터
    if (filter.has_outfit_tag != null) {
      query = query.eq('has_outfit_tag', filter.has_outfit_tag);
    }
    if (filter.has_weather_tag != null) {
      query = query.eq('has_weather_tag', filter.has_weather_tag);
    }

    // 정렬 및 커서 로직
    if (filter.order_by === 'like_count') {
      // 인기순: like_count DESC, created_at DESC
      query = query
        .order('like_count', { ascending: false })
        .order('created_at', { ascending: false });

      if (filter.cursor) {
        // 커서를 JSON 형태로 파싱 (likeCount, createdAt)
        const { likeCount, createdAt } = JSON.parse(
          filter.cursor as string
        ) as {
          likeCount: number;
          createdAt: string;
        };
        // like_count < likeCount
        // OR (like_count == likeCount AND created_at < createdAt)
        query = query.or(
          `like_count.lt.${likeCount},` +
            `and(like_count.eq.${likeCount},created_at.lt.${createdAt})`
        );
      }
    } else {
      // 기본 최신순: created_at DESC
      query = query.order('created_at', { ascending: false });

      if (filter.cursor) {
        // 커서는 created_at 타임스탬프 문자열
        query = query.lt('created_at', filter.cursor as string);
      }
    }

    // 조회 개수 제한 (limit)
    if (filter.limit) {
      query = query.limit(filter.limit);
    }

    const { data, error } = await query;
    if (error || !data) {
      console.error('게시글 조회 실패:', error);
      throw new Error('게시글 조회 실패');
    }

    // 현재 유저가 좋아요 누른 post_id 목록을 한 번 더 조회
    const postIds = data.map((p) => p.post_id);
    let likedSet = new Set<string>();
    if (filter.user_id && postIds.length > 0) {
      const { data: userLikes, error: likesError } = await supabase
        .from('like')
        .select('post_id')
        .eq('user_id', filter.user_id)
        .in('post_id', postIds);

      if (!likesError && userLikes) {
        likedSet = new Set(userLikes.map((l) => l.post_id));
      }
    }

    return data.map((post) => ({
      post_id: post.post_id,
      content: post.content,
      created_at: post.created_at,
      updated_at: post.updated_at,
      has_outfit_tag: post.has_outfit_tag,
      has_weather_tag: post.has_weather_tag,
      temperature_sensitivity: post.temperature_sensitivity,
      post_image: post.post_image,
      like_count: post.like_count,
      has_liked: likedSet.has(post.post_id),
      user: {
        user_id: post.user.user_id,
        nickname: post.user.nickname,
        profile_image: post.user.profile_image,
      },
    }));
  },

  async update(post: Post): Promise<void> {
    const { error } = await supabase
      .from('post')
      .update({
        content: post.content,
        post_image: post.post_image,
        temperature_sensitivity: post.temperature_sensitivity,
        has_outfit_tag: post.has_outfit_tag,
        has_weather_tag: post.has_weather_tag,
        updated_at: new Date().toISOString(),
      })
      .eq('post_id', post.post_id);

    if (error) throw new Error('게시글 수정 실패');
  },

  async delete(postId: string): Promise<void> {
    const { error } = await supabase
      .from('post')
      .delete()
      .eq('post_id', postId);
    if (error) throw new Error('게시글 삭제 실패');
  },

  /** 게시물 상세 요청 */
  async getById(postId: string): Promise<PostView> {
    const { data, error } = await supabase
      .from('post_view')
      .select('*')
      .eq('post_id', postId)
      .single();

    if (error || !data) {
      console.error('게시글 상세 조회 실패:', error?.message || '데이터 없음');
      throw new Error('게시글이 존재하지 않거나 조회에 실패했습니다.');
    }

    return data as PostView;
  },

  async getByUserId(userId: string): Promise<Post[]> {
    const { data, error } = await supabase
      .from('post_view')
      .select('*')
      .eq('user_id', userId);

    if (error || !data) throw new Error('유저 게시글 조회 실패');
    return data as Post[];
  },

  async getPopular(regionId?: string, limit: number = 10): Promise<Post[]> {
    let query = supabase
      .from('post_view')
      .select('*')
      .order('like_count', { ascending: false })
      .limit(limit);
    if (regionId) query = query.eq('region_id', regionId);

    const { data, error } = await query;
    if (error || !data) throw new Error('인기 게시글 조회 실패');
    return data as Post[];
  },
};

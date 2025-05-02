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

  async update(postData): Promise<void> {
    const { data, error } = await supabase
      .from('post')
      .update({
        content: postData.content,
        post_image: postData.post_image ?? null,
        has_outfit_tag: postData.has_outfit_tag ?? false,
        has_weather_tag: postData.has_weather_tag ?? false,
        updated_at: new Date().toISOString(),
      })
      .eq('post_id', postData.post_id)
      .select('*');

    if (error || !data) throw new Error('게시글 수정 실패');
  },

  async delete(postId: string): Promise<void> {
    const { error } = await supabase
      .from('post')
      .delete()
      .eq('post_id', postId);
    if (error) throw new Error('게시글 삭제 실패');
  },

  async getById(postId: string, userId: string): Promise<PostView> {
    // 1) view에서 post 불러오기
    const { data, error } = await supabase
      .from('post_view')
      .select('*')
      .eq('post_id', postId)
      .single();

    if (error || !data) {
      console.error('게시글 상세 조회 실패:', error?.message || '데이터 없음');
      throw new Error('게시글이 존재하지 않거나 조회에 실패했습니다.');
    }

    // 2) 현재 유저의 좋아요 여부 조회
    let hasLiked = false;
    if (userId) {
      const { data: likeData, error: likeError } = await supabase
        .from('like')
        .select('post_id')
        .eq('user_id', userId)
        .eq('post_id', postId)
        .single();

      if (!likeError && likeData) {
        hasLiked = true;
      }
    }

    // 3) 최종 반환형에 맞춰 매핑
    return {
      post_id: data.post_id,
      content: data.content,
      created_at: data.created_at,
      updated_at: data.updated_at,
      has_outfit_tag: data.has_outfit_tag,
      has_weather_tag: data.has_weather_tag,
      temperature_sensitivity: data.temperature_sensitivity,
      post_image: data.post_image,
      like_count: data.like_count,
      has_liked: hasLiked,
      user: {
        user_id: data.user.user_id,
        nickname: data.user.nickname,
        profile_image: data.user.profile_image,
      },
    };
  },

  async getByUserId(userId: string): Promise<Post[]> {
    const { data, error } = await supabase
      .from('post_view')
      .select('*')
      .eq('user_id', userId);

    if (error || !data) throw new Error('유저 게시글 조회 실패');
    return data as Post[];
  },

  async getLikedPostsByUser(user_id) {
    // likes 테이블에서 user_id에 매칭되는 post를 join
    const { data, error } = await supabase
      .from('like')
      .select(
        `
        post (
          post_id, content, post_image, created_at, updated_at,
          like_count,
          has_outfit_tag, has_weather_tag,
          temperature_sensitivity,
          user:user_id ( user_id, nickname, profile_image )
          )
          `
      )
      .eq('user_id', user_id);

    if (error) throw new Error('좋아요 게시물 조회 실패');

    return data.map((row: any) => {
      const p = row.post;
      return {
        post_id: p.post_id,
        content: p.content,
        post_image: p.post_image,
        created_at: p.created_at,
        updated_at: p.updated_at,
        like_count: p.like_count,
        has_outfit_tag: p.has_outfit_tag,
        has_weather_tag: p.has_weather_tag,
        temperature_sensitivity: p.temperature_sensitivity,
        user: {
          user_id: p.user.user_id,
          nickname: p.user.nickname,
          profile_image: p.user.profile_image,
        },
        // 이미 이 usecase는 “내가 좋아요 누른 것이니” has_liked=true 로 고정
        has_liked: true,
      } as PostView;
    });
  },

  async getPostsByUser(user_id: string): Promise<PostView[]> {
    const { data, error } = await supabase
      .from('post_view')
      .select('*')
      // user JSON 안의 user_id를 꺼내서 비교
      .eq('user->>user_id', user_id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase getPostsByUser error:', error);
      throw new Error('내가 쓴 게시물 조회 실패');
    }
    if (!data) return [];

    return data.map((row: any) => ({
      post_id: row.post_id,
      content: row.content,
      post_image: row.post_image,
      created_at: row.created_at,
      updated_at: row.updated_at,
      like_count: row.like_count,
      has_outfit_tag: row.has_outfit_tag,
      has_weather_tag: row.has_weather_tag,
      temperature_sensitivity: row.temperature_sensitivity,
      user: {
        user_id: row.user.user_id,
        nickname: row.user.nickname,
        profile_image: row.user.profile_image,
      },
      has_liked: false,
    }));
  },
};

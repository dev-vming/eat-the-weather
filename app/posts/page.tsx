'use client';

import PostHeader from '../components/PostHeader';
import PostItem from '../components/PostItem';
import { Plus } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { PostView } from '@/domain/entities/PostView';
import { api } from '@/lib/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function PostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const region_id = searchParams.get('region_id') ?? undefined;
  const order_by =
    (searchParams.get('order_by') as 'created_at' | 'like_count') ??
    'created_at';
  const has_outfit_tag =
    searchParams.get('has_outfit_tag') === 'true' ? true : undefined;
  const has_weather_tag =
    searchParams.get('has_weather_tag') === 'true' ? true : undefined;

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery<{ posts: PostView[]; nextCursor?: string }, Error>({
    queryKey: ['posts', region_id, order_by, has_outfit_tag, has_weather_tag],
    initialPageParam: undefined,

    queryFn: async ({
      pageParam = undefined,
    }): Promise<{ posts: PostView[]; nextCursor?: string }> => {
      const params = new URLSearchParams();
      if (region_id) params.set('region_id', region_id);
      params.set('order_by', order_by);
      if (has_outfit_tag !== undefined)
        params.set('has_outfit_tag', String(has_outfit_tag));
      if (has_weather_tag !== undefined)
        params.set('has_weather_tag', String(has_weather_tag));
      if (pageParam) params.set('cursor', pageParam as string);

      const res = await api.get<{ posts: PostView[]; nextCursor?: string }>(
        `/posts?${params.toString()}`
      );
      return res.data;
    },
    getNextPageParam: (lastPage: { posts: PostView[]; nextCursor?: string }) =>
      lastPage.nextCursor,
  });

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchNextPage();
      },
      { threshold: 1.0 }
    );
    obs.observe(loadMoreRef.current);
    return () => obs.disconnect();
  }, [fetchNextPage, hasNextPage]);

  // 모든 페이지의 posts 합치기
  const posts: PostView[] = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div className="h-screen flex flex-col bg-white relative">
      <PostHeader />
      <div className="flex-1 overflow-y-auto px-4 pb-14">
        {status === 'pending' && <p className="text-center mt-8">로딩 중...</p>}
        {status === 'error' && (
          <p className="text-center mt-8">오류: {(error as Error).message}</p>
        )}
        {posts.map((post) => (
          <div key={post.post_id}>
            <PostItem
              content={post.content}
              date={new Date(post.created_at).toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
              nickname={post.user.nickname}
              tags={[
                ...(post.has_weather_tag ? ['날씨'] : []),
                ...(post.has_outfit_tag ? ['옷차림'] : []),
              ]}
              liked={false}
              likeCount={post.like_count}
              sensitivity={post.temperature_sensitivity}
              image={post.post_image}
              detail={false}
            />
            <div className="border-b" />
          </div>
        ))}
        <div ref={loadMoreRef} className="h-8 flex justify-center items-center">
          {isFetchingNextPage && <span>더 불러오는 중...</span>}
        </div>
      </div>
      <button
        className="absolute bottom-18 right-8 z-50 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
        onClick={() => router.push('/posts/new')}
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}

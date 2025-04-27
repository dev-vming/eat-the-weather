'use client';

import PostHeader from '../components/PostHeader';
import PostItem from '../components/PostItem';
import { Plus } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { PostView } from '@/domain/entities/PostView';
import { api } from '@/lib/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import { useQueryTriggerStore } from '@/store/queryTriggerStore';

export default function PostPage() {
  const isAuthenticated = useUserStore((state) => state.user.isAuthenticated);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, selectedWeatherRegion } = useUserStore();
  const { queryTrigger, setQueryTriggerFalse } = useQueryTriggerStore();
  const queryClient = useQueryClient();

  // region_id: 선택된 지역이 없으면 서울시 중구로 대체(임시)
  const region_id =
    selectedWeatherRegion?.region_id ?? 'b32f5114-e015-4ac5-afba-0375f6e2c5c5';
  // user_id: 항상 현재 로그인 유저
  const user_id = user.user_id;

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
    queryKey: [
      'posts',
      region_id,
      user_id,
      order_by,
      has_outfit_tag,
      has_weather_tag,
    ],
    initialPageParam: undefined,

    queryFn: async ({ pageParam = undefined }) => {
      const params = new URLSearchParams();

      params.set('region_id', region_id);
      params.set('user_id', user_id);
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
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
      return;
    }
    if (queryTrigger) {
      queryClient.resetQueries({
        queryKey: [
          'posts',
          region_id,
          user_id,
          order_by,
          has_outfit_tag,
          has_weather_tag,
        ],
      });
      setQueryTriggerFalse();
    }
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

  const posts: PostView[] = data?.pages.flatMap((page) => page.posts) ?? [];
  if (!isAuthenticated) return null;
  return (
    <div className="h-screen flex flex-col bg-white relative">
      <PostHeader />
      <div className="flex-1 overflow-y-auto px-4 pb-14">
        {status === 'pending' && <p className="text-center mt-8">로딩 중...</p>}
        {status === 'error' && (
          <p className="text-center mt-8">오류: {(error as Error).message}</p>
        )}

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-lg font-semibold">게시물이 없습니다.</p>
            <p className="text-sm">새로운 게시물을 작성해보세요!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.post_id}>
              <Link href={`/posts/${post.post_id}`} className="z-0">
                <PostItem
                  postId={post.post_id}
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
                  liked={post.has_liked}
                  likeCount={post.like_count}
                  sensitivity={post.temperature_sensitivity}
                  image={post.post_image}
                  detail={false}
                  my={false}
                />
                <div className="border-b" />
              </Link>
            </div>
          ))
        )}
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

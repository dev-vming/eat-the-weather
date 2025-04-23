'use client';

import PostHeader from '../components/PostHeader';
import PostItem from '../components/PostItem';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PostView } from '@/domain/entities/PostView';
import { api } from '@/lib/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PostPage() {
  const [posts, setPosts] = useState<PostView[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const params = new URLSearchParams();

        const region_id = searchParams.get('region_id');
        const order_by = searchParams.get('order_by');
        const has_outfit_tag = searchParams.get('has_outfit_tag');
        const has_weather_tag = searchParams.get('has_weather_tag');

        if (region_id) params.set('region_id', region_id);
        if (order_by) params.set('order_by', order_by);
        if (has_outfit_tag) params.set('has_outfit_tag', has_outfit_tag);
        if (has_weather_tag) params.set('has_weather_tag', has_weather_tag);

        const res = await api.get<{ posts: PostView[] }>(
          `/posts?${params.toString()}`
        );
        setPosts(res.data.posts);
      } catch (error) {
        console.error('게시글 불러오기 실패:', error);
      }
    };

    fetchPosts();
  }, [searchParams]);

  return (
    <div className="h-screen flex flex-col bg-white relative">
      <PostHeader />

      {/* ✅ 게시글 영역 */}
      <div className="flex-1 overflow-y-auto px-4 pb-14">
        {posts.map((post) => (
          <div key={post.post_id}>
            <Link href={`/posts/${post.post_id}`}>
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
                liked={false} // TODO: 사용자 상태 기반 처리
                likeCount={post.like_count}
                sensitivity={post.temperature_sensitivity}
                image={post.post_image}
                detail={false}
              />
              <div className="border-b" />
            </Link>
          </div>
        ))}
      </div>

      {/* ✅ 글쓰기 버튼 */}
      <button
        className="absolute bottom-18 right-8 z-50 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors cursor-pointer"
        onClick={() => router.push('/posts/new')}
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}

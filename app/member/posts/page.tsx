'use client';

import { useEffect, useState } from 'react';
import { BackButton } from '@/app/components/BackButton';
import PostItem from '@/app/components/PostItem';
import { PostView } from '@/domain/entities/PostView';
import { api } from '@/lib/axios';
import { useUserStore } from '@/store/userStore';
import Link from 'next/link';

export default function MemberPostsPage() {
  const { user } = useUserStore();

  const [posts, setPosts] = useState<PostView[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user.user_id) return;

    const fetchMyPosts = async () => {
      setIsLoading(true);
      try {
        const res = await api.get<{ posts: PostView[] }>('/posts/member', {
          headers: { 'x-user-id': user.user_id },
        });
        setPosts(res.data.posts);
      } catch (err: any) {
        console.error('내가 작성한 게시물 조회 실패:', err);
        setError(err.message || '알 수 없는 오류');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyPosts();
  }, [user.user_id]);

  if (isLoading) {
    return <p className="p-4 text-center">로딩 중...</p>;
  }
  if (error) {
    return <p className="p-4 text-center text-red-500">오류: {error}</p>;
  }
  if (posts.length === 0) {
    return <p className="p-4 text-center">작성한 게시물이 없습니다.</p>;
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="flex gap-4 items-center px-4 py-6">
        <BackButton />
        <h1 className="text-lg font-bold">내가 작성한 글</h1>
      </div>
      <div className="flex-grow overflow-y-auto px-4 pb-20">
        {posts.map((post) => (
          <div key={post.post_id}>
            <Link href={`/posts/${post.post_id}`}>
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
                liked={false}
                likeCount={post.like_count}
                sensitivity={post.temperature_sensitivity}
                image={post.post_image}
                detail={false}
                my={true}
              />
              <div className="border-b" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

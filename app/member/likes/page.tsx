'use client';

import { BackButton } from '@/app/components/BackButton';
import PostItem from '@/app/components/PostItem';
import { PostView } from '@/domain/entities/PostView';
import { api } from '@/lib/axios';
import { useUserStore } from '@/store/userStore';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function MemberLikesPage() {
  const { user } = useUserStore();
  const {
    data: posts,
    status,
    error,
  } = useQuery({
    queryKey: ['posts', 'liked', user.user_id],
    queryFn: async () => {
      const res = await api.get<{ posts: PostView[] }>(`/posts/liked`, {
        headers: { 'x-user-id': user.user_id },
      });
      return res.data.posts;
    },
    enabled: !!user.user_id,
  });
  console.log('좋아요 게시물 페이지에서:', posts);
  console.log('유저 아이디? 페이지에서:', user.user_id);

  if (status === 'error') return <p>오류: {(error as Error).message}</p>;
  if (!posts?.length) return <p>좋아요 누른 게시물이 없습니다.</p>;

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="flex items-center gap-4 px-4 py-6">
        <BackButton />
        <h1 className="text-lg font-bold">내가 좋아요한 글</h1>
      </div>
      <div className="flex-grow overflow-y-auto px-4 pb-20">
        {posts?.map((post, index) => (
          <div key={`${post.post_id}_${index}`}>
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

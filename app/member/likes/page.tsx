'use client';

import { BackButton } from '@/app/components/BackButton';
import PostItem from '@/app/components/PostItem';
import Link from 'next/link';

export default function MemberLikesPage() {
  const posts = [
    {
      post_id: 'post_001',
      content: '오늘은 정말 더워서 반팔을 입었어요. 다들 여름 준비 되셨나요?',
      created_at: '2025-04-23T10:30:00Z',
      user: {
        nickname: '햇살좋은날',
      },
      like_count: 12,
      temperature_sensitivity: 0,
      post_image: '/sample1.jpg',
      has_weather_tag: true,
      has_outfit_tag: true,
    },
    {
      post_id: 'post_002',
      content: '날이 흐려서 긴팔 셔츠 입었어요. 바람도 살짝 불어요.',
      created_at: '2025-04-22T18:45:00Z',
      user: {
        nickname: '구름이몽글',
      },
      like_count: 5,
      temperature_sensitivity: -1,
      post_image: '/sample2.jpg',
      has_weather_tag: true,
      has_outfit_tag: false,
    },
    {
      post_id: 'post_003',
      content: '일교차가 커서 겉옷 꼭 챙기세요!',
      created_at: '2025-04-21T09:15:00Z',
      user: {
        nickname: '겉옷요정',
      },
      like_count: 8,
      temperature_sensitivity: 1,
      post_image: '/sample3.jpg',
      has_weather_tag: false,
      has_outfit_tag: true,
    },
    {
      post_id: 'post_001',
      content: '오늘은 정말 더워서 반팔을 입었어요. 다들 여름 준비 되셨나요?',
      created_at: '2025-04-23T10:30:00Z',
      user: {
        nickname: '햇살좋은날',
      },
      like_count: 12,
      temperature_sensitivity: 0,
      post_image: '/sample1.jpg',
      has_weather_tag: true,
      has_outfit_tag: true,
    },
    {
      post_id: 'post_002',
      content: '날이 흐려서 긴팔 셔츠 입었어요. 바람도 살짝 불어요.',
      created_at: '2025-04-22T18:45:00Z',
      user: {
        nickname: '구름이몽글',
      },
      like_count: 5,
      temperature_sensitivity: -1,
      post_image: '/sample2.jpg',
      has_weather_tag: true,
      has_outfit_tag: false,
    },
    {
      post_id: 'post_003',
      content: '일교차가 커서 겉옷 꼭 챙기세요!',
      created_at: '2025-04-21T09:15:00Z',
      user: {
        nickname: '겉옷요정',
      },
      like_count: 8,
      temperature_sensitivity: 1,
      post_image: '/sample3.jpg',
      has_weather_tag: false,
      has_outfit_tag: true,
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="flex items-center gap-4 px-4 py-6">
        <BackButton />
        <h1 className="text-lg font-bold">내가 좋아요한 글</h1>
      </div>
      <div className="flex-grow overflow-y-auto px-4 pb-20">
        {posts.map((post, index) => (
          <div key={`${post.post_id}_${index}`}>
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
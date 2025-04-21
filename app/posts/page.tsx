'use client';

import PostHeader from '../components/PostHeader';
import PostItem, { PostProps } from '../components/PostItem';
import { Plus } from 'lucide-react';

const dummyPosts: PostProps[] = [
  {
    content: '오늘 너무 추워서 코트를 입었어요. 체감은 더 낮은 것 같네요 🥶',
    date: '2025.04.17 오전 08:30',
    nickname: '날씨물 작성자',
    tags: ['날씨', '옷차림'],
    liked: true,
    likeCount: 12,
    sensitivity: -1,
  },
  {
    content: '딱 가디건 하나 걸치기 좋은 날씨네요! 따뜻하게 입으세요 ☀️',
    date: '2025.04.16 오후 01:20',
    nickname: '기분좋은날',
    tags: ['날씨', '옷차림'],
    liked: false,
    likeCount: 5,
    sensitivity: 0,
  },
  {
    content: '후덥지근한 날씨... 반팔 입어도 더워요 🥵',
    date: '2025.04.15 오후 03:45',
    nickname: '여름싫어',
    tags: ['옷차림', '날씨'],
    liked: true,
    likeCount: 18,
    sensitivity: 1,
  },
  {
    content: '패딩 입었는데 덥네요... 옷 잘못 입은 날 ㅋㅋ',
    date: '2025.04.14 오전 10:15',
    nickname: '초보민감러',
    tags: ['옷차림'],
    liked: false,
    likeCount: 2,
    sensitivity: 1,
  },
  {
    content: '오늘은 선선해서 나름 괜찮네요.',
    date: '2025.04.13 오후 07:50',
    nickname: '일기장처럼',
    tags: ['날씨'],
    liked: false,
    likeCount: 7,
    sensitivity: 0,
  },
];

export default function PostPage() {
  return (
    <div className="h-screen flex flex-col bg-white relative">
      <PostHeader />
      {/* ✅ 게시글 영역 (스크롤 가능) */}
      <div className="flex-1 overflow-y-auto px-4 pb-14">
        {/* 게시글 컴포넌트 넣을 공간 */}
        {dummyPosts.map((e, i) => (
          <div key={i}>
            <PostItem
              content={e.content}
              date={e.date}
              nickname={e.nickname}
              tags={e.tags}
              liked={e.liked}
              likeCount={e.likeCount}
              sensitivity={e.sensitivity}
              detail={false}
            />
            <div className="border-b" />
          </div>
        ))}
      </div>
      <button className="absolute bottom-18 right-8 z-50 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors cursor-pointer">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}

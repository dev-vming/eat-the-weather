'use client'
import CommentItems from '@/app/components/CommentItems';
import PostItem from '@/app/components/PostItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const postData = {
  content: '딱 가디건 하나 걸치기 좋은 날씨네요! 따뜻하게 입으세요 ☀️',
  date: '2025.04.16 오후 01:20',
  nickname: '기분좋은날',
  tags: ['날씨', '옷차림'],
  liked: false,
  likeCount: 5,
  sensitivity: 0,
};

const dummyComments = [
  {
    id: '1',
    author: '답변작성자',
    content: '우산 챙기세요 갑자기 비가와요 ☔️',
    createdAt: '2025.04.16 오후 02:00',
  },
  {
    id: '2',
    author: '나',
    content: '우산 없는데 큰일이네요..?',
    createdAt: '2025.04.16 오후 03:30',
  },
  {
    id: '3',
    author: '직장인',
    content: '아직 오는데 퇴근길 걱정이네요',
    createdAt: '2025.04.16 오후 05:30',
  },
  {
    id: '4',
    author: '주영',
    content: '지금은 안 와요 !!!!',
    createdAt: '2025.04.16 오후 06:00',
  },
  {
    id: '5',
    author: '민혁',
    content:
      '개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ개꿀 ㅎ',
    createdAt: '2025.04.16 오후 06:30',
  },
  {
    id: '6',
    author: '민정',
    content: '테스트 진행중입니다. 테스트입니다.',
    createdAt: '2025.04.16 오후 07:30',
  },
];

export default function PostDetailPage() {
  return (
    <div className="h-screen flex flex-col bg-white px-4 pt-6">
      {/* 상단 헤더 */}
      <h1 className="text-lg font-bold">게시판</h1>

      {/* 게시물 영역 */}
      <div className="pt-6">
        <PostItem
          content={postData.content}
          date={postData.date}
          nickname={postData.nickname}
          tags={postData.tags}
          liked={postData.liked}
          likeCount={postData.likeCount}
          sensitivity={postData.sensitivity}
          detail={true}
        />
      </div>

      {/* 댓글 구분선 */}
      <div className="flex items-center pb-10">
        <Separator className="flex-1" />
        <span className="mx-4 text-gray-300 text-sm">
          {dummyComments.length}개의 댓글
        </span>
        <Separator className="flex-1" />
      </div>

      {/* 댓글 리스트 영역 */}
      <div className="flex-1 overflow-y-auto pr-2 mb-2">
        <CommentItems comments={dummyComments} />
      </div>

      {/* 댓글 입력창 */}
      <div className="flex items-center gap-2 pt-6 pb-25 flex-shrink-0 bg-white">
        <Input
          type="text"
          placeholder="댓글을 입력하세요..."
          className="flex-1 bg-gray-100 text-sm"
        />
        <Button variant="default" className="text-sm px-3">
          등록
        </Button>
      </div>
    </div>
  );
}
'use client';
import { Heart } from 'lucide-react';
import SensitivityBadge from './SensitivityBadge';
import PostUserBox from './PostUserBox';
import LikeButton from './LikeButton';

export interface PostProps {
  postId: string;
  content: string;
  date: string;
  nickname: string;
  tags: string[];
  image?: string;
  liked?: boolean;
  likeCount: number;
  sensitivity: number;
  detail?: boolean;
  my?: boolean;
}

export default function PostItem({
  postId,
  content,
  date,
  nickname,
  tags,
  image,
  liked,
  likeCount,
  sensitivity,
  detail,
  my,
}: PostProps) {
  return (
    <div
      className={`px-4 py-5 z-0 ${detail ? '' : 'cursor-pointer hover:bg-gray-50'}`}
    >
      {/* 프로필, 좋아요 영역 */}
      <div
        className="flex justify-between mb-3 z-10 hover:bg-gray-50 cursor-pointer"
        onClick={() => console.log('Like area clicked')}
      >
        <PostUserBox nickname={nickname} date={date} />
        {!my && (
          <LikeButton
            postId={postId}
            initialLiked={false}
            initialLikeCount={likeCount}
          />
        )}
      </div>
      <div className="flex items-center justify-between mb-4">
        {/* 뱃지 / 태그 영역 */}
        <SensitivityBadge sensitivity={sensitivity} />
        <div className="flex items-center gap-5 text-xs font-semibold">
          {tags.map((e, i) => (
            <p key={i}># {e}</p>
          ))}
        </div>
      </div>
      <div className="mb-5 text-sm text-gray-800 line-clamp-2 mb-1-clamp-2">
        {content}
      </div>
    </div>
  );
}

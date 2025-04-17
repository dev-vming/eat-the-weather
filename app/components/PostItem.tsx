import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart } from 'lucide-react';
import SensitivityBadge from './SensitivityBadge';

export interface PostProps {
  content: string;
  date: string;
  nickname: string;
  tags: string[];
  image?: string;
  liked?: boolean;
  likeCount: number;
  sensitivity: number;
}

export default function PostItem({
  content,
  date,
  nickname,
  tags,
  image,
  liked,
  likeCount,
  sensitivity,
}: PostProps) {
  return (
    <div className="px-4 py-5 cursor-pointer hover:bg-gray-50 border-b">
      {/* 프로필, 좋아요 영역 */}
      <div className="flex justify-between mb-3">
        <div className="flex items-center gap-5">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/images/user.png" alt="유저 아바타" />
            <AvatarFallback className='text-sm'>{nickname[0]}</AvatarFallback>
          </Avatar>
          <div className="text-gray-500 text-sm font-semibold">
            <p>{nickname}</p>
            <p>{date}</p>
          </div>
        </div>
        <div className="flex items-center justify-center text-gray-500 gap-1">
          <Heart className={`w-4 h-4 ${liked ? 'fill-rose-400 text-rose-400' : ''}`} />
          <p className="text-sm font-semibold">{likeCount}</p>
        </div>
        
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

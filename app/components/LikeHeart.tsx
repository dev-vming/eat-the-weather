import { Heart } from 'lucide-react';

interface LikeHeartProps {
  liked: boolean;
  likeCount: number;
}

function LikeHeart({ liked, likeCount }: LikeHeartProps) {
  return (
    <div className={`flex items-center justify-center text-gray-500 gap-1`}>
      <Heart
        className={`w-4 h-4 ${liked ? 'fill-rose-400 text-rose-400' : ''}`}
      />
      <p className="text-sm font-semibold">{likeCount}</p>
    </div>
  );
}

export default LikeHeart;

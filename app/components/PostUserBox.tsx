'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PostUserBoxProps {
  nickname: string;
  date?: string;
}

export default function PostUserBox({ nickname, date }: PostUserBoxProps) {
  return (
    <div className="flex items-center gap-5">
      <Avatar className="w-12 h-12">
        <AvatarImage src="/images/user2.png" alt="유저 아바타" />
        <AvatarFallback className="text-sm">{nickname[0]}</AvatarFallback>
      </Avatar>
      <div className="text-gray-500 text-sm font-semibold">
        <p>{nickname}</p>
        <p>{date}</p>
      </div>
    </div>
  );
}

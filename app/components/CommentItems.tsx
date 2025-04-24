'use client';

import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Comment {
  comment_id: string;
  user_id: string;
  content: string;
  nickname: string;
  created_at: string | Date;
}

interface CommentListProps {
  comments: Comment[];
  onDelete?: (id: string) => void;
}

export default function CommentItems({ comments, onDelete }: CommentListProps) {
  return (
    <div className="overflow-y-auto flex-1">
      {comments.map((comment, idx) => (
        <div
          key={`${comment.comment_id}-${idx}`} // 확실하게 중복방지
          className={`flex mb-2 ${comment.nickname === '나' ? 'justify-end' : 'justify-start'}`}
        >
          <div className="flex flex-col items-start mb-1">
            <span className="text-xs text-gray-400 mb-1">
            {comment.nickname} ·{' '}
            {format(new Date(comment.created_at), 'yyyy.MM.dd a hh:mm', { locale: ko })}
            </span>


            <div
              className={`py-3 px-4 rounded-xl text-sm whitespace-pre-wrap
                  ${comment.nickname === '나' ? 'bg-yellow-200 text-black' : 'bg-yellow-100 text-black'}
                  ${comment.nickname === '나' ? 'rounded-br-none' : 'rounded-bl-none'}`}
            >
              {comment.content}
            </div>

            {comment.nickname === '나' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => alert('아직 개발중 🤔')}
                className="cursor-pointer text-xs text-gray-400 self-end p-0 hover:text-red-700 hover:bg-transparent"
              >
                삭제
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

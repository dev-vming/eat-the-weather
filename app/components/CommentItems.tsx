'use client';

import { Button } from '@/components/ui/button';

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

interface CommentListProps {
  comments: Comment[];
  onDelete?: (id: string) => void;
}

export default function CommentItem({ comments, onDelete }: CommentListProps) {
  return (
    <div className="overflow-y-auto flex-1">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className={`flex mb-2 ${comment.author === '나' ? 'justify-end' : 'justify-start'}`}
        >
          <div className="flex flex-col items-start mb-1">
            <span className="text-xs text-gray-400 mb-1">
              {comment.author} · {comment.createdAt}
            </span>

            <div
              className={`py-3 px-4 rounded-xl text-sm whitespace-pre-wrap
                  ${comment.author === '나' ? 'bg-yellow-200 text-black' : 'bg-yellow-100 text-black'}
                  ${comment.author === '나' ? 'rounded-br-none' : 'rounded-bl-none'}`}
            >
              {comment.content}
            </div>

            {comment.author === '나' && (
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

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useUserStore } from '@/store/userStore';
import { api } from '@/lib/axios';

interface Comment {
  comment_id: string;
  user_id: string;
  content: string;
  nickname: string;
  created_at: string | Date;
}

interface CommentListProps {
  comments: Comment[];
  post_id: string | string[]; // ✅ 추가
  onRefresh?: () => void;
}

export default function CommentItems({ comments, post_id, onRefresh }: CommentListProps) {
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const currentUserId = useUserStore((state) => state.user.user_id);

   const handleCommentDelete =  async (comment_id: string) => {
    try {
      await api.delete(`/comment/${comment_id}`);
      onRefresh?.();
      const res = await api.get<Comment[]>(`/posts/${post_id}/comments`);
      setCommentList(res.data);
    } catch (error) {
      console.error('❌ 댓글 삭제 실패:', error);
    }
  };
  

  return (
    <div className="overflow-y-auto flex-1">
      {comments.map((comment, idx) => (
        <div
          key={`${comment.comment_id}-${idx}`} // 확실하게 중복방지
          className={`flex mb-2 ${currentUserId === comment.user_id ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex flex-col ${currentUserId === comment.user_id ? 'items-end' : 'items-start'}`}>            <span className="text-xs text-gray-400 mb-1">
            {currentUserId === comment.user_id ? '나' : comment.nickname} ·{' '}
            {format(new Date(comment.created_at), 'yyyy.MM.dd a hh:mm', { locale: ko })}
          </span>


            <div
              className={`w-fit max-w-[75%] py-3 px-4 rounded-xl text-sm whitespace-pre-wrap
                  ${currentUserId === comment.user_id ? 'bg-yellow-200 text-black ml-auto' : 'bg-yellow-100 text-black'}
                  ${currentUserId === comment.user_id ? 'rounded-br-none' : 'rounded-bl-none'}`}
            >
              {comment.content}
            </div>

            {currentUserId === comment.user_id && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (!comment.comment_id) {
                    console.warn("❗ comment_id가 없음:", comment);
                    return;
                  }
                  handleCommentDelete(comment.comment_id);
                }}
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

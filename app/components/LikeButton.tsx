'use client';

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import LikeHeart from './LikeHeart';
import { useUserStore } from '@/store/userStore';
import { useQueryTriggerStore } from '@/store/queryTriggerStore';

interface LikeButtonProps {
  postId: string;
  initialLiked: boolean;
  initialLikeCount: number;
}

export default function LikeButton({
  postId,
  initialLiked,
  initialLikeCount,
  ...props
}: LikeButtonProps) {
  const queryClient = useQueryClient();
  const userId = useUserStore((s) => s.user.user_id);

  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const { toggleQueryTrigger } = useQueryTriggerStore();

  // mutate에 이전 liked 상태를 넘기도록 TVariables를 boolean으로 지정
  const { mutate: toggleLike, status } = useMutation<
    unknown, // TData
    Error, // TError
    boolean, // TVariables: 호출 시 넘길 변수 (prevLiked)
    { previous: unknown } // TContext
  >({
    // 변수(prevLiked)를 받아서, 그 값 기준으로 API 호출
    mutationFn: (prevLiked) => {
      if (prevLiked) {
        // 이전에 liked였다면, 삭제 요청
        return Promise.resolve(
          api.request({
            url: `/posts/${postId}/like`,
            method: 'DELETE',
            data: { userId },
          })
        );
      } else {
        // 이전에 liked가 아니었다면, 추가 요청
        return Promise.resolve(api.post(`/posts/${postId}/like`, { userId }));
      }
    },

    // onMutate에도 같은 prevLiked를 받아서 UI 상태 반영
    onMutate: async (prevLiked) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previous = queryClient.getQueryData(['posts']);

      // UI: 이전값(prevLiked)의 반대 값으로 보여줌
      setLiked(!prevLiked);
      setLikeCount((c) => c + (prevLiked ? -1 : 1));
      toggleQueryTrigger();
      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['posts'], context.previous);
      }
      // 실패 시, UI 롤백
      setLiked(liked);
      toggleQueryTrigger();
      setLikeCount((c) => c - (liked ? -1 : 1));
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const isLoading = status === 'pending';

  return (
    <button
      type="button"
      className="
        cursor-pointer p-1 rounded hover:bg-gray-200 transition-colors focus:outline-none
      "
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLoading) return;
        // 현재 liked 상태를 그대로 변수로 넘겨 줍니다.
        toggleLike(liked);
      }}
      {...props}
    >
      <LikeHeart liked={liked} likeCount={likeCount} />
    </button>
  );
}

'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import SensitivityBadge from './SensitivityBadge';
import PostUserBox from './PostUserBox';
import LikeButton from './LikeButton';
import Image from 'next/image';
import { api } from '@/lib/axios';
import { useUserStore } from '@/store/userStore';

export interface PostProps {
  userId: string;
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
  profileImage?: string;
}

export default function PostItem({
  userId,
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
  profileImage,
}: PostProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useUserStore();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await api.delete(`/posts/${postId}`);
      router.push('/posts');
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`px-4 py-5 z-0 ${detail ? '' : 'cursor-pointer hover:bg-gray-100'}`}
    >
      {/* 삭제하기/ 수정하기 영역 */}
      {pathname !== '/posts' && userId === user.user_id && (
        <div className="flex gap-2">
          <div
            className={`text-gray-500 underline cursor-pointer mb-3 text-sm inline-block w-auto hover:text-gray-700 ${
              isDeleting
                ? 'cursor-not-allowed text-gray-300 hover:text-gray-300'
                : ''
            }`}
            onClick={handleDelete}
          >
            {isDeleting ? '삭제중...' : '삭제하기'}
          </div>
          <div
            className={`text-gray-500 underline cursor-pointer mb-3 text-sm inline-block w-auto hover:text-gray-700 ${
              isDeleting
                ? 'cursor-not-allowed text-gray-300 hover:text-gray-300'
                : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/posts/${postId}/edit`);
            }}
          >
            수정하기
          </div>
        </div>
      )}

      <div className="flex justify-between mb-3 z-10 hover:bg-gray-100 cursor-pointer">
        <PostUserBox
          nickname={nickname}
          date={date}
          profileImage={profileImage}
        />

        {/* 좋아요 하트 영역역 */}
        {!my && (
          <LikeButton
            postId={postId}
            initialLiked={liked ?? false}
            initialLikeCount={likeCount}
          />
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <SensitivityBadge sensitivity={sensitivity} />
        <div className="flex items-center gap-5 text-xs font-semibold">
          {tags.map((e, i) => (
            <p key={i}># {e}</p>
          ))}
        </div>
      </div>

      <div className="flex flex-row justify-between">
        {/* 이미지 / 콘텐츠 영역 */}
        <div className="mb-5 text-sm text-gray-800 line-clamp-2 mb-1-clamp-2">
          {content}
        </div>
        {image && (
          <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
            <Image
              src={image}
              alt="게시물 이미지"
              style={{ objectFit: 'cover' }}
              sizes="64px"
              width={64}
              height={64}
            />
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import CommentItems from '@/app/components/CommentItems';
import PostItem from '@/app/components/PostItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { PostView } from '@/domain/entities/PostView';
import { GetCommentViewDto } from '@/application/usecases/comment/dto/GetCommentDto';
import { api } from '@/lib/axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { BackButton } from '@/app/components/BackButton';

export default function PostDetailPage() {
  const params = useParams();
  const post_id = params['post-id'];
  const user_id = useUserStore((state) => state.user.user_id);
  const [postData, setPostData] = useState<PostView | null>(null);
  const [comments, setComments] = useState<GetCommentViewDto[]>([]);
  const [inputComment, setInputComment] = useState<string>('');

  useEffect(() => {
    // post_id, user_id 둘 다 있어야 호출
    if (!post_id || !user_id) return;

    const fetchPost = async () => {
      try {
        const res = await api.get<{ post: PostView }>(`/posts/${post_id}`, {
          headers: { 'x-user-id': user_id },
        });
        setPostData(res.data.post);
      } catch (error) {
        console.error('게시글 상세 조회 실패:', error);
      }
    };

    if (post_id && typeof post_id === 'string') fetchPost();
  }, [post_id, user_id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get<GetCommentViewDto[]>(
          `/posts/${post_id}/comments`
        );
        setComments(res.data);
      } catch (error) {
        console.error('댓글 불러오기 실패:', error);
      }
    };

    if (post_id && typeof post_id === 'string') fetchComments();
  }, [post_id]);

  if (!postData) return <div className="p-6">로딩 중...</div>;

  const handleCommentSubmit = async () => {
    if (!inputComment.trim()) return; // 빈 댓글은 제출하지 않음
    try {
      await api.post(`/comment`, {
        post_id: post_id,
        user_id: user_id,
        content: inputComment,
      });
      // 댓글 다시 불러오기
      const res = await api.get<GetCommentViewDto[]>(
        `/posts/${post_id}/comments`
      );
      setComments(res.data);

      // 입력창 초기화
      setInputComment('');
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white px-4 pt-6">
      <div className="flex items-center gap-4 mb-6">
        <BackButton />
        <h1 className="text-lg font-bold">게시물 상세</h1>
      </div>

      {/* 게시물 영역 */}
      <div>
        <PostItem
          userId={postData.user.user_id}
          postId={post_id as string}
          content={postData.content}
          date={new Date(postData.created_at).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
          profileImage={postData.user.profile_image}
          nickname={postData.user.nickname}
          tags={[
            ...(postData.has_weather_tag ? ['날씨'] : []),
            ...(postData.has_outfit_tag ? ['옷차림'] : []),
          ]}
          liked={postData.has_liked}
          likeCount={postData.like_count}
          sensitivity={postData.temperature_sensitivity}
          image={postData.post_image}
          detail={true}
        />
      </div>

      {/* 댓글 구분선 */}
      <div className="flex items-center pt-4 pb-6">
        <Separator className="flex-1" />
        <span className="mx-4 text-gray-400 text-xs">
          {comments.length}개의 댓글
        </span>
        <Separator className="flex-1" />
      </div>

      {/* 댓글 리스트 */}
      <div className="flex-1 overflow-y-auto pr-2 mb-2">
        {post_id && (
          <CommentItems
            comments={comments}
            post_id={post_id}
            onRefresh={async () => {
              const res = await api.get<GetCommentViewDto[]>(
                `/posts/${post_id}/comments`
              );
              setComments(res.data);
            }}
          />
        )}
      </div>

      {/* 댓글 입력창 */}
      <div className="flex items-center gap-2 px-4 py-5 mb-20 flex-shrink-0 bg-white border-t">
        <Input
          type="text"
          placeholder="댓글을 입력하세요..."
          className="flex-1 bg-gray-100 text-sm"
          onChange={(e) => setInputComment(e.target.value)}
          value={inputComment}
        />
        <Button
          variant="default"
          className="text-sm px-3 cursor-pointer"
          onClick={handleCommentSubmit}
        >
          등록
        </Button>
      </div>
    </div>
  );
}

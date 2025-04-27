'use client';

import PostForm from '@/app/components/PostForm';
import { PostView } from '@/domain/entities/PostView';
import { api } from '@/lib/axios';
import { useUserStore } from '@/store/userStore';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PostEditPage() {
  //기존 데이터 가져오기기
  const params = useParams();
  const post_id = params['post-id'];
  const user_id = useUserStore((state) => state.user.user_id);
  const [postData, setPostData] = useState<PostView | null>(null);
  const router = useRouter();
  const { user, selectedWeatherRegion } = useUserStore();
  const region_id = selectedWeatherRegion?.region_id;

  console.log('postData:', postData);

  const handleUpdate = async (data: {
    content: string;
    has_outfit_tag: boolean;
    has_weather_tag: boolean;
    post_image?: string | null;
  }) => {
    try {
      const postData = {
        user_id: user.user_id,
        region_id,
        content: data.content,
        post_image: data.post_image ?? null,
        temperature_sensitivity: user.temperature_sensitivity,
        has_outfit_tag: data.has_outfit_tag,
        has_weather_tag: data.has_weather_tag,
        post_id: post_id,
      };

      await api.patch(`/posts/${postData.post_id}`, postData);
      router.push('/posts');
    } catch (error) {
      alert('게시글 수정 실패');
    }
  };

  useEffect(() => {
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

  return (
    <PostForm
      isEdit={true}
      initialContent={postData?.content}
      initialHasOutfitTag={postData?.has_outfit_tag}
      initialHasWeatherTag={postData?.has_weather_tag}
      initialImageUrl={postData?.post_image}
      onSubmit={handleUpdate}
    />
  );
}

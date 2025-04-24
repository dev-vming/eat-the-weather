'use client';

import PostForm from '@/app/components/PostForm';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';

export default function PostNewPage() {
  const router = useRouter();
  const { user, selectedWeatherRegion } = useUserStore();
  const region_id = selectedWeatherRegion?.region_id;

  const handleCreate = async (data: {
    content: string;
    has_outfit_tag: boolean;
    has_weather_tag: boolean;
  }) => {
    try {
      const postData = {
        user_id: user.user_id,
        region_id,
        content: data.content,
        post_image: null, // TODO: 이미지 업로드 연동 시 수정
        temperature_sensitivity: user.temperature_sensitivity,
        has_outfit_tag: data.has_outfit_tag,
        has_weather_tag: data.has_weather_tag,
      };

      const res = await api.post('/posts', postData);

      router.push('/posts');
    } catch (error: any) {
      console.error('게시글 작성 중 오류:', error);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  return <PostForm onSubmit={handleCreate} />;
}

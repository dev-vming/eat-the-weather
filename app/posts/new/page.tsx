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
      };
  
      await api.post('/posts', postData);
      router.push('/posts');
    } catch (error) {
      alert('게시글 작성 실패');
    }
  };

  return <PostForm onSubmit={handleCreate} />;
}

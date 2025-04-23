'use client';

import PostForm from '@/app/components/PostForm';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';

export default function PostNewPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  // TODO: 임시 region_id (나중에 유저가 선택한 지역 반영 필요)
  const region_id = '00e7555d-2732-48dc-85ea-789de6ee37f2';

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

'use client';

import PostForm from '@/app/components/PostForm';
import { useRouter } from 'next/navigation';

export default function PostEditPage() {
  const post = {
    content: '오늘은 바람이 많이 불어서 두꺼운 자켓을 입었어요.',
    post_id: 'abc-123',
  };

  const postTags = [{ tag_id: 'clothing' }, { tag_id: 'weather' }];

  const router = useRouter();

  const handleUpdate = (data: { content: string; tags: string[] }) => {
    console.log('수정 데이터:', data);
    router.push('/posts/detail');
  };

  return (
    <PostForm
      isEdit
      initialContent={post.content}
      initialTags={postTags.map((tag) => tag.tag_id)}
      onSubmit={handleUpdate}
    />
  );
}

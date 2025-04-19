'use client';

import PostForm from '@/app/components/PostForm';
import { useRouter } from 'next/navigation';


export default function PostNewPage() {
  const router = useRouter();
  const handleCreate = (data: { content: string; tags: string[] }) => {
    console.log('작성 데이터:', data);
    router.push('/posts');
  };

  return <PostForm onSubmit={handleCreate} />;
}

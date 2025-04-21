'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import PostUserBox from '@/app/components/PostUserBox';

interface PostFormProps {
  initialContent?: string;
  initialTags?: string[]; // ['clothing', 'weather'] 와 같은 문자열 배열
  isEdit?: boolean;
  onSubmit: (data: { content: string; tags: string[] }) => void;
}

export default function PostForm({
  initialContent = '',
  initialTags = [],
  isEdit = false,
  onSubmit,
}: PostFormProps) {
  const [clothingChecked, setClothingChecked] = useState(initialTags.includes('clothing'));
  const [weatherChecked, setWeatherChecked] = useState(initialTags.includes('weather'));
  const [content, setContent] = useState(initialContent);

  const isTagChecked = clothingChecked || weatherChecked;
  const isContentValid = content.trim().length > 0;
  const isFormValid = isTagChecked && isContentValid;

  const getPlaceholder = () => {
    if (isEdit) return '';
    if (clothingChecked && weatherChecked) return '옷차림과 날씨에 대한 이야기를 나누어보세요.';
    if (clothingChecked) return '옷차림에 대한 이야기를 나눠보세요.';
    if (weatherChecked) return '날씨에 대한 이야기를 나눠보세요.';
    return '';
  };

  const handleSubmit = () => {
    const tags = [];
    if (clothingChecked) tags.push('clothing');
    if (weatherChecked) tags.push('weather');
    onSubmit({ content, tags });
  };

  return (
    <div className="h-screen flex flex-col bg-white px-4 pt-6">
      <h1 className="text-lg font-bold mb-6">{isEdit ? '게시물 수정' : '게시물 작성'}</h1>
      <div className='mt-15'>
      <PostUserBox nickname="글 작성자" />
      <div className="w-full max-w-xl flex flex-col gap-4 mt-4">
        <div>
          <span className="text-xs font-semibold text-gray-500">무엇에 대한 게시물인가요?</span>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <Checkbox
                checked={clothingChecked}
                onCheckedChange={() => setClothingChecked(!clothingChecked)}
              />
              <span className="text-sm">옷차림</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={weatherChecked}
                onCheckedChange={() => setWeatherChecked(!weatherChecked)}
              />
              <span className="text-sm">날씨</span>
            </label>
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold text-gray-500">공유할 내용을 입력해주세요.</span>
          <Textarea
            className="h-80 resize-none overflow-y-auto mt-2"
            placeholder={getPlaceholder()}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <Button
          className="w-full bg-blue-900 text-white"
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          {isEdit ? '수정하기' : '작성하기'}
        </Button>
      </div>
      </div>
      
    </div>
  );
}
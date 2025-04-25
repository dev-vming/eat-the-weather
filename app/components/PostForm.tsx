'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import PostUserBox from '@/app/components/PostUserBox';
import { BackButton } from './BackButton';
import { useUserStore } from '@/store/userStore';

interface PostFormProps {
  initialContent?: string;
  isEdit?: boolean;
  onSubmit: (data: {
    content: string;
    has_outfit_tag: boolean;
    has_weather_tag: boolean;
  }) => void;
}

export default function PostForm({
  initialContent = '',
  isEdit = false,
  onSubmit,
}: PostFormProps) {
  const [content, setContent] = useState(initialContent);

  const [clothingChecked, setClothingChecked] = useState(false);
  const [weatherChecked, setWeatherChecked] = useState(false);

  const isTagChecked = clothingChecked || weatherChecked;
  const isContentValid = content.trim().length > 0;
  const isFormValid = isTagChecked && isContentValid;

  const { user } = useUserStore();

  const getPlaceholder = () => {
    if (isEdit) return '';
    if (clothingChecked && weatherChecked)
      return '옷차림과 날씨에 대한 이야기를 나누어보세요.';
    if (clothingChecked) return '옷차림에 대한 이야기를 나눠보세요.';
    if (weatherChecked) return '날씨에 대한 이야기를 나눠보세요.';
    return '';
  };

  const handleSubmit = () => {
    onSubmit({
      content,
      has_outfit_tag: clothingChecked,
      has_weather_tag: weatherChecked,
    });
  };

  return (
    <div className="h-screen flex flex-col bg-white px-4 pt-6">
      <div className='flex items-center gap-4 mb-6'>
        <BackButton />
        <h1 className="text-lg font-bold">
          {isEdit ? '게시물 수정' : '게시물 작성'}
        </h1>
      </div>
      <div className="mt-15">
        <PostUserBox nickname={user.nickname} profileImage={user.profile_image} />
        <div className="w-full max-w-xl flex flex-col gap-4 mt-4">
          <div>
            <span className="text-xs font-semibold text-gray-500">
              무엇에 대한 게시물인가요?
            </span>
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
            <span className="text-xs font-semibold text-gray-500">
              공유할 내용을 입력해주세요.
            </span>
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

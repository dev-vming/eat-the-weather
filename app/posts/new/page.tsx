'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import PostUserBox from '@/app/components/PostUserBox';

export default function PostNewPage() {
  const [clothingChecked, setClothingChecked] = useState(false);
  const [weatherChecked, setWeatherChecked] = useState(false);
  const [content, setContent] = useState('');

  const isTagChecked = clothingChecked || weatherChecked;
  const isContentValid = content.trim().length > 0;
  const isFormValid = isTagChecked && isContentValid;

  const getPlaceholder = () => {
    if (clothingChecked && weatherChecked) {
      return '옷차림과 날씨에 대한 이야기를 나누어보세요.';
    } else if (clothingChecked) {
      return '옷차림에 대한 이야기를 나눠보세요.';
    } else if (weatherChecked) {
      return '날씨에 대한 이야기를 나눠보세요.';
    }
    return '';
  };

  return (
    <div className="h-screen flex flex-col bg-white px-4 pt-6">
      <h1 className="text-lg font-bold mb-25">게시물 작성</h1>
      <PostUserBox nickname='글 작성자'/>
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
          onClick={() => alert('작성 완료되었습니다 🥳')}
        >
          작성하기
        </Button>
      </div>
    </div>
  );
}
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
  initialImageUrl?: string | null;
  onSubmit: (data: {
    content: string;
    has_outfit_tag: boolean;
    has_weather_tag: boolean;
    post_image?: string | null;
  }) => void;
}

export default function PostForm({
  initialContent = '',
  isEdit = false,
  initialImageUrl = null,
  onSubmit,
}: PostFormProps) {
  const [content, setContent] = useState(initialContent);
  const [clothingChecked, setClothingChecked] = useState(false);
  const [weatherChecked, setWeatherChecked] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialImageUrl);
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    let uploadedImageUrl: string | null = imagePreview ?? null;

    if (!isEdit && imageFile) {
      try {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('fileName', imageFile.name);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        uploadedImageUrl = data.url;
      } catch (err) {
        alert('이미지 업로드 실패');
      }
    }

    onSubmit({
      content,
      has_outfit_tag: clothingChecked,
      has_weather_tag: weatherChecked,
      post_image: uploadedImageUrl,
    });
  };

  return (
    <div className="h-screen flex flex-col bg-white px-4 pt-6">
      <div className="flex items-center gap-4 mb-6">
        <BackButton />
        <h1 className="text-lg font-bold">
          {isEdit ? '게시물 수정' : '게시물 작성'}
        </h1>
      </div>

      <PostUserBox nickname={user.nickname} profileImage={user.profile_image} />

      <div className="w-full max-w-xl flex flex-col gap-4 mt-4">
        {/* 태그 선택 */}
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

        {/* 내용 입력 */}
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

        {/* 이미지 업로드 or 미리보기 */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-gray-500">
            이미지 첨부
          </span>

          {!isEdit && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm"
            />
          )}

          {imagePreview && (
            <div className="w-full max-w-xs">
              <img
                src={imagePreview}
                alt="미리보기"
                className="rounded-md border shadow"
              />
            </div>
          )}
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
  );
}

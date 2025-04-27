'use client';

import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import PostUserBox from '@/app/components/PostUserBox';
import { BackButton } from './BackButton';
import { useUserStore } from '@/store/userStore';
import { X } from 'lucide-react';
import { api } from '@/lib/axios';

interface PostFormProps {
  initialContent?: string;
  isEdit?: boolean;
  initialImageUrl?: string | null;
  initialHasOutfitTag?: boolean;
  initialHasWeatherTag?: boolean;
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
  initialHasOutfitTag = false,
  initialHasWeatherTag = false,
  onSubmit,
}: PostFormProps) {
  const { user } = useUserStore();

  const [content, setContent] = useState(initialContent);
  const [clothingChecked, setClothingChecked] = useState(initialHasOutfitTag);
  const [weatherChecked, setWeatherChecked] = useState(initialHasWeatherTag);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialImageUrl
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Sync props → state on mount or prop change
  useEffect(() => {
    setContent(initialContent);
    setClothingChecked(initialHasOutfitTag);
    setWeatherChecked(initialHasWeatherTag);
    setImagePreview(initialImageUrl);
    setImageFile(null);
  }, [
    initialContent,
    initialHasOutfitTag,
    initialHasWeatherTag,
    initialImageUrl,
  ]);

  const isTagChecked = clothingChecked || weatherChecked;
  const isContentValid = content.trim().length > 0;
  const isFormValid = isTagChecked && isContentValid;

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

  // Remove preview only; submit happens on final 버튼 클릭
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const uploadImage = async (file: File) => {
    const ext = file.name.includes('.') ? file.name.split('.').pop()! : 'jpg';
    const safeFileName = `${user.user_id}_${Date.now()}.${ext}`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', safeFileName);

    const res = await api.post<{ url: string }>('/image', formData);
    if (!res.data?.url) {
      throw new Error('이미지 URL을 받아올 수 없습니다.');
    }
    return res.data.url;
  };

  const handleSubmit = async () => {
    let finalImageUrl: string | null = imagePreview;

    // 새로 추가된 파일이 있으면 업로드
    if (imageFile) {
      try {
        finalImageUrl = await uploadImage(imageFile);
      } catch {
        alert('이미지 업로드 실패! 다시 시도해주세요!');
        return;
      }
    }

    onSubmit({
      content,
      has_outfit_tag: clothingChecked,
      has_weather_tag: weatherChecked,
      post_image: finalImageUrl,
    });
  };

  return (
    <div className="h-screen flex flex-col bg-white px-4 pt-6">
      {/* 헤더 */}
      <div className="flex items-center gap-4 mb-6">
        <BackButton />
        <h1 className="text-lg font-bold">
          {isEdit ? '게시물 수정' : '게시물 작성'}
        </h1>
      </div>

      {/* 유저 박스 */}
      <PostUserBox nickname={user.nickname} profileImage={user.profile_image} />

      <div className="w-full max-w-xl flex flex-col gap-4 mt-4">
        {/* 태그 */}
        <div>
          <span className="text-xs font-semibold text-gray-500">
            무엇에 대한 게시물인가요?
          </span>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <Checkbox
                checked={clothingChecked}
                onCheckedChange={(v) => setClothingChecked(!!v)}
              />
              <span className="text-sm">옷차림</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={weatherChecked}
                onCheckedChange={(v) => setWeatherChecked(!!v)}
              />
              <span className="text-sm">날씨</span>
            </label>
          </div>
        </div>

        {/* 콘텐츠 */}
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

        {/* 이미지 업로드 / 미리보기 */}
        <div className="flex flex-col gap-2 relative">
          <span className="text-xs font-semibold text-gray-500">
            이미지 첨부
          </span>
          <div className="flex items-center gap-4 mt-2">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="미리보기"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-[-8px] right-[-8px] bg-white border rounded-full p-1 shadow-sm cursor-pointer hover:bg-gray-100"
                >
                  <X size={16} className="text-red-700" />
                </button>
              </div>
            ) : (
              <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer text-sm font-medium hover:bg-gray-200">
                파일 선택
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* 제출 */}
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

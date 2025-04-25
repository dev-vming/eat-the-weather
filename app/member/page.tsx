'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LinkItem from '../components/LinkItem';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboardingStore';
import { SquarePen, Camera } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { api } from '@/lib/axios';
import { User } from '@/domain/entities/User';

const linkItems = [
  { href: '/member/posts', label: '작성한 게시물' },
  { href: '/member/likes', label: '좋아요한 게시물' },
  { href: '/onboarding', label: '날씨 민감도 관리' },
  { href: '/member/regions', label: '지역 즐겨찾기 관리' },
  { href: '', label: '로그아웃' },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, setUser } = useUserStore();

  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(user.nickname);
  const [previewImage, setPreviewImage] = useState(user.profile_image);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    useUserStore.getState().clearUser();
    useUserStore.getState().setPersistMode('pre-login');
    useOnboardingStore.getState().clearOnboardingInfo();
    router.push('/');
    alert('로그아웃 되었습니다 😇');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    setNickname(user.nickname);
  };

  const handleSave = async () => {
    try {
      const user_id = user.user_id;
      let imageUrl = user.profile_image;

      if (newImageFile) {
        const ext = newImageFile.name.split('.').pop(); 
        const safeFileName = `${user_id}_${Date.now()}.${ext}`;
      
        const formData = new FormData();
        formData.append('file', newImageFile);
        formData.append('fileName', safeFileName);
      
        const res = await api.post<{ url: string }>('/image', formData);
      
        if (!res.data?.url) throw new Error('URL을 받아올 수 없습니다.');
        imageUrl = res.data.url;
      }
      

      const isNicknameChanged = nickname !== user.nickname;
      const isImageChanged = imageUrl !== user.profile_image;

      if (!isNicknameChanged && !isImageChanged) {
        alert('변경된 내용이 없습니다.');
        setIsEditing(false);
        return;
      }

      if (isNicknameChanged) {
        const checkRes = await api.post<{ available: boolean }>(
          '/auth/check-nickname',
          { nickname }
        );
        if (!checkRes.data.available) {
          alert('이미 사용 중인 닉네임입니다.');
          return;
        }
      }

      const payload = {
        user_id,
        ...(isNicknameChanged && { nickname }),
        ...(isImageChanged && { profile_image: imageUrl }),
      };

      const resUpdate = await api.patch<User>('/user/update', payload);
      setUser(resUpdate.data);
      alert('프로필이 수정되었습니다.');
      setIsEditing(false);
    } catch (error) {
      alert('수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNickname(user.nickname);
    setPreviewImage(user.profile_image);
    setNewImageFile(null);
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-white flex flex-col">
      <h1 className="text-lg font-bold mb-6">마이페이지</h1>

      <div className="flex items-center mb-8 mt-40 justify-between">
        <div className="flex items-center gap-4">
          <div
            className="relative w-12 h-12 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Avatar className="w-12 h-12">
              <AvatarImage
                key={previewImage}
                src={
                  (isEditing && previewImage) ||
                  user.profile_image ||
                  '/images/user2.png'
                }
                alt="유저 아바타"
              />
              <AvatarFallback>프로필</AvatarFallback>
            </Avatar>
            {isEditing && (
              <>
                <div className="absolute bottom-0 right-0 bg-gray-100 p-1 rounded-full">
                  <Camera className="w-4 h-4 text-gray-600" />
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </>
            )}
          </div>

          <div>
            {isEditing ? (
              <Input
                className="w-48"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            ) : (
              <>
                <p className="font-semibold text-base">{user.nickname}</p>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </>
            )}
          </div>
        </div>

        {!isEditing ? (
          <button onClick={handleStartEdit} className="mr-2">
            <SquarePen className="text-gray-700 w-5 h-5" />
          </button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSave}>
              저장
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              취소
            </Button>
          </div>
        )}
      </div>

      <div className="divide-y border-y-2 border-gray-200">
        {linkItems.map((item) =>
          item.label === '로그아웃' ? (
            <div onClick={handleLogout} key={item.label}>
              <LinkItem href={item.href} label={item.label} />
            </div>
          ) : (
            <LinkItem key={item.label} href={item.href} label={item.label} />
          )
        )}
      </div>
    </div>
  );
}

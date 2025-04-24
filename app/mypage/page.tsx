'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import LinkItem from '../components/LinkItem';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboardingStore';

const linkItems = [
  { href: '/mypage/posts', label: '작성한 게시물' },
  { href: '/mypage/likes', label: '좋아요한 게시물' },
  { href: '/onboarding', label: '날씨 민감도 관리' },
  { href: '/regions', label: '지역 관리' },
  { href: '/account', label: '계정 관리' },
  { href: '', label: '로그아웃' },
];

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');

    useOnboardingStore.getState().clearOnboardingInfo();
    useUserStore.getState().clearUser();
    useUserStore.getState().setPersistMode('pre-login');
    alert('로그아웃 되었습니다 😇');

    router.push('/');
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-white flex flex-col">
      <h1 className="text-lg font-bold mb-6">마이페이지</h1>
      <div className="flex items-center gap-4 mb-8 mt-10">
        <Avatar className="w-12 h-12">
          <AvatarImage src="/images/user2.png" alt="유저 아바타" />
          <AvatarFallback>프로필</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-base">김유저</p>
          <p className="text-gray-400 text-sm">user@user.com</p>
        </div>
      </div>

      <div className="divide-y border-y-2 border-gray-200">
        {linkItems.map((item) =>
          item.label === '로그아웃' ? (
            <div onClick={handleLogout}>
              <LinkItem
                key={item.href + item.label}
                href={item.href}
                label={item.label}
              />
            </div>
          ) : (
            <LinkItem
              key={item.href + item.label}
              href={item.href}
              label={item.label}
            />
          )
        )}
      </div>
    </div>
  );
}

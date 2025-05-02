'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUserStore } from '@/store/userStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { Button } from '@/components/ui/button';
import { BackButton } from '../components/BackButton';

function Onboarding() {
  const router = useRouter();
  const persistMode = useUserStore((state) => state.persistMode);

  const handleStartOnboarding = () => {
    router.push('/onboarding/step1'); 
  };

  const handleSkipOnboarding = async () => {
    try {
      useOnboardingStore.getState().clearOnboardingInfo();
      if (persistMode === 'pre-login') {
        useUserStore.getState().clearTempUser();
        useUserStore.getState().setPersistMode('post-login');
        router.push('/auth/login');
      } else {
        router.push('/member');
      }
    } catch (error: any) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col h-screen px-4 py-6 bg-white">
      <div className="flex items-center gap-4">
        <BackButton />
        <h1 className="text-lg font-bold">온보딩</h1>
      </div>

      <div className="justify-center items-center flex flex-col h-full">
        <p className="text-center text-lg font-semibold mb-2 leading-relaxed">
          너의 정보를 살짝 더 알려줄래? <br />
          날씨별로 더 적합한 옷차림을 추천해줄 수 있어!
        </p>
        <p className="text-center text-sm text-gray-500">
          물론, 비밀로 해도 가입은 가능해!
        </p>
        <Image src="/logoImg.png" alt="Logo" width={200} height={200} />
        <div className="w-full flex flex-col max-w-xs gap-2 justify-center items-center">
          <Button
            className="cursor-pointer w-95 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:text-white"
            onClick={handleStartOnboarding}
          >
            좋아! 알려줄게
          </Button>
          <Button
            className="cursor-pointer w-95 py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 hover:text-gray-900"
            onClick={handleSkipOnboarding}
          >
            괜찮아, 나중에 할래!
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;

'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import ChoiceButton from '@/app/components/ChoiceButton';
import Image from 'next/image';
import { useUserStore } from '@/store/userStore';
import { api } from '@/lib/axios';

function Onboarding() {
  const router = useRouter();
  const tempUser = useUserStore((state) => state.tempUser);

  const handleStartOnboarding = () => {
    router.push('/onboarding/step1'); // Step1 페이지로 이동
  };

  const handleSkipOnboarding = async () => {
    try {
      await api.post('/auth/sign-up', {
        ...tempUser,
      });
      useUserStore.getState().clearTempUser();
      useUserStore.getState().setPersistMode('post-signup');
      alert('회원가입 성공! 로그인 페이지로 이동합니다 😆');
      router.push('/auth/login');
    } catch (error: any) {
      alert(error.response?.data?.message || '회원가입 실패 🥲');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 bg-white">
      <p className="text-center text-lg font-semibold mb-2 leading-relaxed">
        너의 정보를 살짝 더 알려줄래? <br />
        날씨별로 더 적합한 옷차림을 추천해줄 수 있어!
      </p>
      <p className="text-center text-sm text-gray-500">
        물론, 비밀로 해도 가입은 가능해!
      </p>
      <Image src="/logoImg.png" alt="Logo" width={200} height={200} />
      <div className="space-y-4 w-full max-w-xs">
        <ChoiceButton
          className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:text-white"
          onClick={handleStartOnboarding}
        >
          좋아! 알려줄게
        </ChoiceButton>
        <ChoiceButton
          className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 hover:text-gray-900"
          onClick={handleSkipOnboarding}
        >
          괜찮아, 나중에 할래!
        </ChoiceButton>
      </div>
    </div>
  );
}

export default Onboarding;

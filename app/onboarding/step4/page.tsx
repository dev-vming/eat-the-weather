'use client';

import { Button } from '@/components/ui/button';
import { api } from '@/lib/axios';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

function OnboardingStep4() {
  const router = useRouter();
  const persistMode = useUserStore((state) => state.persistMode);

  const currTemperature = useOnboardingStore(
    (state) => state.onboardingInfo.currTemperature
  );
  const selectedClothes = useOnboardingStore(
    (state) => state.onboardingInfo.selectedClothes
  );
  const selectedFeeling = useOnboardingStore(
    (state) => state.onboardingInfo.selectedFeeling
  );
  const region_id = useOnboardingStore(
    (state) => state.onboardingInfo.selectedRegion.region_id
  );

  const weatherFit = useMemo(() => {
    if (
      currTemperature === null ||
      selectedClothes === null ||
      selectedClothes === undefined
    )
      return 0;

    if (selectedClothes === 0) return currTemperature >= 23 ? 0 : -1;
    if (selectedClothes === 1)
      return currTemperature < 15 ? -1 : currTemperature > 22 ? 1 : 0;
    if (selectedClothes === 2)
      return currTemperature < 6 ? -1 : currTemperature > 14 ? 1 : 0;
    if (selectedClothes === 3) return currTemperature <= 15 ? 0 : 1;
    return 0;
  }, [currTemperature, selectedClothes]);

  const temperature_sensitivity = useMemo(() => {
    if (selectedFeeling === null) return 0;

    const feelingAdjusted = selectedFeeling - 1;
    if (feelingAdjusted === weatherFit) return 0;
    if (feelingAdjusted === 0) return weatherFit * -1;
    return feelingAdjusted;
  }, [selectedFeeling, weatherFit]);


  const handleButtonClick = async () => {
    try {
      if (persistMode === 'pre-login') {
        const uuid = useUserStore.getState().tempUser.user_id;
        await api.post('/region-favorite', {
          user_id: uuid,
          region_id,
          is_primary: true,
        });

        await api.patch('/user/update', {
          user_id: uuid,
          temperature_sensitivity,
          onboarding_completed: true,
        });
        useUserStore.getState().clearTempUser();
        useOnboardingStore.getState().clearOnboardingInfo();
        useUserStore.getState().setPersistMode('post-login');
        alert('온보딩 완료! 로그인 페이지로 이동합니다 😆');
        router.push('/auth/login');
      } else {
        const uuid = useUserStore.getState().user.user_id;

        await api.patch('/user/update', {
          user_id: uuid,
          temperature_sensitivity,
          onboarding_completed: true,
        });
        useOnboardingStore.getState().clearOnboardingInfo();
        alert('온보딩 완료! 마이페이지로 이동합니다 😆');
        router.push('/member');
      }
    } catch (error: any) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 bg-white">
      <p className="text-center text-lg font-semibold mb-4">
        {temperature_sensitivity === 1
          ? '더위를 잘 느끼는 편이구나?! ☀️'
          : temperature_sensitivity === -1
            ? '추위를 잘 느끼는 편이구나?! ❄️'
            : '기온 변화에 잘 적응하는 편이네! 😊'}
      </p>
      <p className="text-center text-sm text-gray-500 mb-6">
        앞으로 이 결과를 바탕으로 <br />
        날씨를 알려줄게!
      </p>
      <p className="text-center text-xs text-gray-400 mb-8">
        이 정보는 "마이페이지"에서 변경할 수 있어!
      </p>
      <Button
        className="cursor-pointer w-full max-w-xs py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        onClick={handleButtonClick}
      >
        고마워! 잘 부탁해!
      </Button>
    </div>
  );
}

export default OnboardingStep4;

'use client';

import ChoiceButton from '@/app/components/ChoiceButton';
import { useRouter } from 'next/navigation';

function OnboardingStep2() {
  const router = useRouter();

  const handlePrevious = () => {
    router.push('/onboarding/step1');
  };

  const handleNext = () => {
    router.push('/onboarding/step3');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 bg-white">
      <p className="text-center text-lg font-semibold mb-6">
        오늘 입은 옷 어땠어?
      </p>
      <div className="space-y-4 w-full max-w-xs">
        <ChoiceButton className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300">
          더웠어
        </ChoiceButton>
        <ChoiceButton className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300">
          적당했어
        </ChoiceButton>
        <ChoiceButton className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300">
          추웠어
        </ChoiceButton>
      </div>
      <div className="flex justify-between w-full max-w-xs mt-6 space-x-4">
        <ChoiceButton
          className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300"
          onClick={handlePrevious}
        >
          이전
        </ChoiceButton>
        <ChoiceButton
          className="flex-1 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          onClick={handleNext}
        >
          다음
        </ChoiceButton>
      </div>
    </div>
  );
}

export default OnboardingStep2;

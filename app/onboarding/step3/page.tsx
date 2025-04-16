'use client';
import ChoiceButton from '../components/ChoiceButton';
import { useRouter } from 'next/navigation';

function OnboardingStep3() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/');
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 bg-white">
      <p className="text-center text-lg font-semibold mb-4">
        너는 더위를 / 추위를 <br />
        많이 타는 편이구나?!
      </p>
      <p className="text-center text-sm text-gray-500 mb-6">
        앞으로 이 결과를 바탕으로 <br />
        날씨를 알려줄게!
      </p>
      <p className="text-center text-xs text-gray-400 mb-8">
        이 정보는 "마이페이지"에서 변경할 수 있어!
      </p>
      <ChoiceButton
        className="w-full max-w-xs py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        onClick={handleButtonClick}
      >
        고마워! 잘 부탁해!
      </ChoiceButton>
    </div>
  );
}

export default OnboardingStep3;

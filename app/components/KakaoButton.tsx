'use client';

import { Button } from '@/components/ui/button';

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;

export default function KakaoLoginButton() {
  const handleClick = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className="w-100 h-11 m-2 bg-amber-200 md:w-90"
    >
      카카오 로그인
    </Button>
  );
}

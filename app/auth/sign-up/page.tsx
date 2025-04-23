'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/axios';
import KakaoLoginButton from '@/app/components/KakaoButton';
import { useUserStore } from '@/store/userStore';

interface CheckResponse {
  available: boolean;
}

export default function SignUpPage() {
  const router = useRouter();
  const { setTempUser } = useUserStore();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const handleCheck = async (type: 'email' | 'nickname') => {
    const value = type === 'email' ? email : nickname;

    try {
      const res = await api.post<CheckResponse>(`/auth/check-${type}`, { [type]: value });

      if (res.data.available) {
        alert(`사용 가능한 ${type === 'email' ? '이메일' : '닉네임'}입니다!`);
        type === 'email' ? setIsEmailChecked(true) : setIsNicknameChecked(true);
      } else {
        alert(`이미 사용 중인 ${type === 'email' ? '이메일' : '닉네임'}입니다.`);
        type === 'email' ? setIsEmailChecked(false) : setIsNicknameChecked(false);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || `${type} 중복 확인 실패`);
    }
  };

  const handleNext = () => {
    setTempUser({ email, password, nickname, provider:'email' });
    router.push('/onboarding');
  }

  const resetCheck = (type: 'email' | 'nickname') => {
    if (type === 'email') setIsEmailChecked(false);
    if (type === 'nickname') setIsNicknameChecked(false);
  };

  return (
    <div className="justify-center items-center flex flex-col h-screen w-full">
      <div className="font-bold text-lg">회원가입</div>

      {/* 이메일 입력 & 중복확인 */}
      <div className="flex items-center">
        <Input
          type="email"
          placeholder="이메일을 입력하세요."
          className="flex w-65 h-11 m-2 md:w-65 bg-gray-100"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            resetCheck('email');
          }}
        />
        <Button
          variant="outline"
          className="w-30 h-11 m-2 md:w-20"
          disabled={!email.trim()}
          onClick={() => handleCheck('email')}
        >
          중복확인
        </Button>
      </div>

      {/* 닉네임 입력 & 중복확인 */}
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="닉네임을 입력하세요."
          className="w-65 h-11 m-2 md:w-65 bg-gray-100"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            resetCheck('nickname');
          }}
        />
        <Button
          variant="outline"
          className="w-30 h-11 m-2 md:w-20"
          disabled={!nickname.trim()}
          onClick={() => handleCheck('nickname')}
        >
          중복확인
        </Button>
      </div>

      <Input
        type="password"
        placeholder="비밀번호를 입력하세요."
        className="w-90 h-11 m-2 md:w-90 bg-gray-100"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* 온보딩으로 이동하는 버튼 */}
      <Button
        variant="ghost"
        className="w-100 h-11 m-2 bg-blue-900 text-white md:w-90"
        disabled={!isEmailChecked || !isNicknameChecked || !password}
        onClick={handleNext}
      >
        다음
      </Button>

      <KakaoLoginButton state={"signup"} />
      <Link href="/auth/login" className="font-medium">
        로그인
      </Link>
    </div>
  );
}
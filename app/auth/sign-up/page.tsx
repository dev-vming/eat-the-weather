'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/axios';
import KakaoLoginButton from '@/app/components/KakaoButton';
import { useUserStore } from '@/store/userStore';
import Image from 'next/image';

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = passwordRegex.test(password);

  const handleCheck = async (type: 'email' | 'nickname') => {
    const value = type === 'email' ? email : nickname;
    try {
      const res = await api.post<CheckResponse>(`/auth/check-${type}`, {
        [type]: value,
      });
      if (res.data.available) {
        alert(`사용 가능한 ${type === 'email' ? '이메일' : '닉네임'}입니다!`);
        type === 'email' ? setIsEmailChecked(true) : setIsNicknameChecked(true);
      } else {
        alert(
          `이미 사용 중인 ${type === 'email' ? '이메일' : '닉네임'}입니다.`
        );
        type === 'email'
          ? setIsEmailChecked(false)
          : setIsNicknameChecked(false);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || `${type} 중복 확인 실패`);
    }
  };

  const handleNext = async () => {
    const { data } = await api.post('/auth/sign-up', {
      email,
      password,
      nickname,
      onboarding_completed: false,
      temperature_sensitivity: 0,
      provider: 'email',
    });
    setTempUser({ user_id: data as string });
    router.push('/onboarding');
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="px-4 py-6">
        <h1 className="text-lg font-bold">회원가입</h1>
      </div>
      <div className='flex flex-col justify-center items-center mt-25'>
      <Image width={250} height={250} src="/EatTheWeather.png" alt="Eat the weather 서비스 로고"/>
        {/* 이메일 */}
        <div className="-mt-10 flex items-center">
          <Input
            type="email"
            placeholder="이메일을 입력하세요."
            className={`flex w-65 h-11 m-2 md:w-65 ${!isEmailValid && email ? 'ring-2 ring-red-300 focus-visible:ring-red-300 bg-red-50' : 'bg-gray-100'}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailChecked(false);
            }}
          />
          <Button
            variant="outline"
            className="w-30 h-11 m-2 md:w-20"
            disabled={!isEmailValid}
            onClick={() => handleCheck('email')}
          >
            중복확인
          </Button>
        </div>
        {!isEmailValid && email && (
          <p className="text-red-300 text-sm -mt-1 ml-15 flex self-start">
            올바른 이메일 형식이 아닙니다.
          </p>
        )}

        {/* 닉네임 */}
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="닉네임을 입력하세요."
            className="w-65 h-11 m-2 md:w-65 bg-gray-100"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setIsNicknameChecked(false);
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

        {/* 비밀번호 */}
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요."
          className={`w-90 h-11 m-2 md:w-90 ${!isPasswordValid && password ? 'ring-2 ring-red-300 focus-visible:ring-red-300 bg-red-50' : 'bg-gray-100'}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isPasswordValid && password && (
          <p className="text-red-300 text-sm -mt-1">
            비밀번호는 8자리 이상, 숫자와 특수문자를 포함해야 합니다.
          </p>
        )}

        {/* 다음 버튼 */}
        <Button
          variant="ghost"
          className="w-100 h-11 m-2 bg-blue-900 text-white md:w-90"
          disabled={!isEmailChecked || !isNicknameChecked || !isPasswordValid}
          onClick={handleNext}
        >
          다음
        </Button>

        <KakaoLoginButton state="signup" />
      </div>
    </div>
  );
}

import { NextRequest, NextResponse } from 'next/server';
import { EmailSignupRequestDto } from '@/application/usecases/auth/dto/AuthDto';
import { SbUserRepository } from '@/infra/repositories/supabase/SbUserRepository';
import { EmailSignupUsecase } from '@/application/usecases/auth/EmailSignupUsecase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, nickname, onboarding_completed, temperature_sensitivity, provider } =
      body as EmailSignupRequestDto;

    const { user } = await EmailSignupUsecase(SbUserRepository(), {
      email,
      password,
      nickname,
      onboarding_completed,
      temperature_sensitivity,
      provider,
    });

    const res = NextResponse.json({ user }, { status: 201 });

    return res;
  } catch (error: any) {
    return NextResponse.json({ message: error.message || '회원가입 실패' }, { status: 400 });
  }
}
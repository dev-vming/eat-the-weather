import { NextRequest, NextResponse } from 'next/server';
import { EmailSignupRequestDto } from '@/application/usecases/auth/dto/AuthDto';
import { SbUserRepository } from '@/infra/repositories/supabase/SbUserRepository';
import { signupWithEmail } from '@/application/usecases/auth/EmailSignupUsecase';
import { setAuthCookie } from '@/utils/cookie';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, nickname, onboarding_completed, temperature_sensitivity, provider } =
      body as EmailSignupRequestDto;

    const { user, token } = await signupWithEmail(SbUserRepository(), {
      email,
      password,
      nickname,
      onboarding_completed,
      temperature_sensitivity,
      provider: 'email',
    });

    const res = NextResponse.json({ user }, { status: 201 });
    // setAuthCookie(res, token);
    return res;
  } catch (error: any) {
    return NextResponse.json({ message: error.message || '회원가입 실패' }, { status: 400 });
  }
}
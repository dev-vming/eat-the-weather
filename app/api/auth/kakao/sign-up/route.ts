import { NextRequest, NextResponse } from 'next/server';
import { SbUserRepository } from '@/infra/repositories/supabase/SbUserRepository';
import { KakaoUserDto } from '@/application/usecases/auth/dto/KakaoAuthDto';
import { kakaoSignupUsecase } from '@/application/usecases/auth/KakaoSignupUsecase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { user } = await kakaoSignupUsecase(SbUserRepository(), body);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

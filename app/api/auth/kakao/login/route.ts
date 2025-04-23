import { NextRequest, NextResponse } from 'next/server';
import { SbUserRepository } from '@/infra/repositories/supabase/SbUserRepository';
import { KakaoUserDto } from '@/application/usecases/auth/dto/KakaoAuthDto';
import { kakaoLoginUsecase } from '@/application/usecases/auth/KakaoLoginUsecase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, from } = body;

    const dto: KakaoUserDto = {
      code,
      clientId: process.env.KAKAO_REST_API_KEY!,
      redirectUri: process.env.KAKAO_REDIRECT_URI!,
    };

    if (from === 'login') {
      const { user, accessToken, refreshToken } = await kakaoLoginUsecase(SbUserRepository(), dto);
      return NextResponse.json({ user, accessToken, refreshToken }, { status: 200 });
    }

    return NextResponse.json({ message: '유효하지 않은 from 파라미터입니다.' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
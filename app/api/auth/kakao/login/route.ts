import { KakaoUserDto } from '@/application/usecases/auth/dto/KakaoAuthDto';
import { kakaoLoginUsecase } from '@/application/usecases/auth/KakaoLoginUsecase';
import { SbUserRepository } from '@/infra/repositories/supabase/SbUserRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const dto: KakaoUserDto = {
      code: body.code,
      clientId: process.env.KAKAO_REST_API_KEY!,
      redirectUri: process.env.KAKAO_REDIRECT_URI!,
    };
    const { accessToken, refreshToken } = await kakaoLoginUsecase(
      SbUserRepository(),
      dto
    );

    const res = NextResponse.json(
      { accessToken, refreshToken },
      { status: 200 }
    );

    return res;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}

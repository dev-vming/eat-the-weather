import { SbUserRepository } from './../../../../infra/repositories/supabase/SbUserRepository';
import { EmailLoginUsecase } from './../../../../application/usecases/auth/EmailLoginUsecase';
import { NextRequest, NextResponse } from 'next/server';
import { EmailLoginRequestDto } from '@/application/usecases/auth/dto/AuthDto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body as EmailLoginRequestDto;
    const { accessToken, refreshToken } = await EmailLoginUsecase(
      SbUserRepository(),
      { email, password }
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

import { SbUserRepository } from './../../../../infra/repositories/supabase/SbUserRepository';
import { EmailLoginUsecase } from './../../../../application/usecases/auth/EmailLoginUsecase';
import { NextRequest, NextResponse } from 'next/server';
import { EmailLoginRequestDto } from '@/application/usecases/auth/dto/AuthDto';
import { setAuthCookie } from '@/utils/cookie';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, password, remember } = body as EmailLoginRequestDto & { remember: boolean };

    const { user, token } = await EmailLoginUsecase(SbUserRepository(), { email, password });

    const res = NextResponse.json({ user }, { status: 200 });

    setAuthCookie(res, token, remember);

    return res;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { NickCheckUsecase } from './../../../../application/usecases/auth/NicknameCheckUsecase';
import { SbUserRepository } from '@/infra/repositories/supabase/SbUserRepository';


export async function POST(req: NextRequest) {
  const { nickname } = await req.json();
  const isAvailable = await NickCheckUsecase(SbUserRepository(), nickname);
  return NextResponse.json({ available: isAvailable });
}
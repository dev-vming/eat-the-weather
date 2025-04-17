import { NextRequest, NextResponse } from 'next/server';
import { EmailCheckUsecase } from '@/application/usecases/auth/EmailCheckUsecase';
import { SbUserRepository } from '@/infra/repositories/supabase/SbUserRepository';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const isAvailable = await EmailCheckUsecase(SbUserRepository(), email);
  return NextResponse.json({ available: isAvailable });
}
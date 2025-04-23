import { GetUserInfoUsecase } from '@/application/usecases/user/GetUserInfoUsecase';
import { SbUserRepository } from '@/infra/repositories/supabase/SbUserRepository';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  params: {
    email: string;
  };
};

export async function GET(req: NextRequest, { params }: Params) {
  const {email} = await params;
  const user = await GetUserInfoUsecase(SbUserRepository(), email);

    return NextResponse.json(user);
}
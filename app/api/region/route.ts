import { NextRequest, NextResponse } from 'next/server';
import { getAllRegionsUsecase } from '@/application/usecases/region/GetAllRegionsUsecase';
import { SbRegionRepository } from '@/infra/repositories/supabase/SbRegionRepository';
import { GetRegionByCoordsUsecase } from '@/application/usecases/region/GetRegionByCoordsUsecase';
import { KkRegionRepository } from '@/infra/repositories/kakao/KkRegionRepository';

export async function GET() {
  const regions = await getAllRegionsUsecase(SbRegionRepository());
  return NextResponse.json(regions);
}

export async function POST(req: NextRequest) {
  const { latitude, longitude } = await req.json();

  const kakaoApiKey = process.env.KAKAO_REST_API_KEY!;
  const region = await GetRegionByCoordsUsecase(KkRegionRepository(kakaoApiKey),{ latitude, longitude });

  if (!region) {
    return NextResponse.json({ message: "주소를 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json(region);
}
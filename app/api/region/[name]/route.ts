import { NextRequest, NextResponse } from 'next/server';
import { getCoordsUsecase } from '@/application/usecases/region/GetCoordsUsecase';
import { SbRegionRepository } from '@/infra/repositories/supabase/SbRegionRepository';

type Params = {
  params: {
    name: string;
  };
};

export async function GET(req: NextRequest, { params }: Params) {
  const name = decodeURIComponent(params.name);
  const region = await getCoordsUsecase(SbRegionRepository(), name);

    return NextResponse.json(region);
}
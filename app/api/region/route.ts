import { NextResponse } from 'next/server';
import { getAllRegionsUsecase } from '@/application/usecases/region/GetAllRegionsUsecase';
import { SbRegionRepository } from '@/infra/repositories/supabase/SbRegionRepository';

export async function GET() {
  const regions = await getAllRegionsUsecase(SbRegionRepository());
  return NextResponse.json(regions);
}

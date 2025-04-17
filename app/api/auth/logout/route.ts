import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie } from '@/utils/cookie';

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ message: "로그아웃 성공" });
  clearAuthCookie(res);
  return res;
}

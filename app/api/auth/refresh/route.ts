import { AuthToken } from "@/utils/AuthToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = await req.json();
    const payload = AuthToken.verifyRefreshToken(refreshToken);

    const newAccessToken = AuthToken.issueAccessToken(payload.email, payload.nickname);

    return NextResponse.json({ accessToken: newAccessToken });
  } catch (error: any) {
    return NextResponse.json({ message: "리프레시 토큰이 유효하지 않습니다." }, { status: 401 });
  }
}
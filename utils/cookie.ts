import { serialize } from "cookie";
import { NextResponse } from "next/server";

export const setAuthCookie = (
  res: NextResponse,
  token: string,
  remember?: boolean
) => {
  const cookie = serialize("token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    ...(remember ? { maxAge: 60 * 60 * 24 * 7 } : {}), 
  });

  res.headers.set("Set-Cookie", cookie); 
};

export const clearAuthCookie = (res: NextResponse) => {
  const cookie = serialize("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  res.headers.set("Set-Cookie", cookie);
};
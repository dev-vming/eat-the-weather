import { serialize } from "cookie";

export const setAuthCookie = (res: any, token: string, remember: boolean) => {
  const cookie = serialize("token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    ...(remember ? { maxAge: 60 * 60 * 24 * 7 } : {}) // 7일 vs 세션 쿠키
  });

  res.setHeader("Set-Cookie", cookie);
};

export const clearAuthCookie = (res: any) => {
  const cookie = serialize("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  res.setHeader("Set-Cookie", cookie);
};

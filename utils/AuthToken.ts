import jwt, { JwtPayload as DefaultJwtPayload, SignOptions } from "jsonwebtoken";

export interface JwtPayload extends DefaultJwtPayload {
  email: string;
  nickname: string;
}

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

if (!JWT_SECRET || !REFRESH_SECRET) {
  throw new Error("JWT_SECRET 또는 REFRESH_SECRET이 설정되지 않았습니다.");
}

export const AuthToken = {
  issueAccessToken: (email: string,nickname:string): string => {
    const payload: JwtPayload = {
      email,
      nickname,
    };
    const options: SignOptions = { expiresIn: "1h" }; // 짧게
    return jwt.sign(payload, JWT_SECRET, options);
  },

  issueRefreshToken: (email: string, nickname:string): string => {
    const payload: JwtPayload = {
      email,
      nickname,
    };
    const options: SignOptions = { expiresIn: "7d" }; // 길게
    return jwt.sign(payload, REFRESH_SECRET, options);
  },

  verifyAccessToken: (token: string): JwtPayload => {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  },

  verifyRefreshToken: (token: string): JwtPayload => {
    return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
  },
};
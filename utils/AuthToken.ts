import jwt, {
  JwtPayload as DefaultJwtPayload,
  SignOptions,
} from 'jsonwebtoken';
import { User } from '@/domain/entities/User';

export interface JwtPayload extends DefaultJwtPayload {
  email: string;
  nickname: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET 환경 변수가 설정되지 않았습니다.');
}

export const AuthToken = {
  issueToken: (user: User): string => {
    const payload: JwtPayload = {
      email: user.email,
      nickname: user.nickname,
    };

    // 기한 설정 논의 필요
    const options: SignOptions = {
      expiresIn: "7d"
    };

    return jwt.sign(payload, JWT_SECRET, options);
  },

  verifyToken: (token: string): JwtPayload => {
    const decoded = jwt.verify(token, JWT_SECRET) as DefaultJwtPayload;

    if (typeof decoded === 'object' && decoded !== null) {
      return decoded as JwtPayload;
    }

    throw new Error('유효하지 않은 토큰입니다.');
  },
};

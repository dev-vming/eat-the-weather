import { SignupRequestDto } from "@/application/usecases/auth/dto/AuthDto";
import { User } from "../entities/User";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByNickname(nickname: string): Promise<boolean>;
  create(user: SignupRequestDto): Promise<User>;
}
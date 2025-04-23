import { SignupRequestDto } from "@/application/usecases/auth/dto/AuthDto";
import { User } from "../entities/User";
import { UpdateUserRequestDto } from "@/application/usecases/user/dto/UpdateUserDto";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByNickname(nickname: string): Promise<boolean>;
  create(user: SignupRequestDto): Promise<User>;
  update(user_id: string, dto: UpdateUserRequestDto): Promise<User>;
}
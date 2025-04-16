import { UserRepository } from '@/domain/repositories/UserRepository';
import { supabase } from './Sbclient';

export const SbUserRepository = (): UserRepository => ({
  async findByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) return null;

    return {
      userId: data.userId,
      email: data.email,
      nickname: data.nickname,
      provider: data.provider,
      onboardingCompleted: data.onboardingCompleted,
      temperatureSetting: data.temperatureSetting,
      profileImage: data.profileImage,
    };
  },

  async create(user) {
    const { data, error } = await supabase
      .from('users')
      .insert({
        email: user.email,
        nickname: user.nickname,
        provider: user.provider,
        password: user.password,
        onboardingCompleted: user.onboardingCompleted,
        temperatureSetting: user.temperatureSetting,
        profileImage: user.profileImage,
      })
      .select()
      .single();

    if (error) throw new Error('유저 생성 실패');

    return {
      userId: data.userId,
      email: data.email,
      nickname: data.nickname,
      provider: data.provider,
      password: data.password,
      profileImage: data.profileImage,
      temperatureSetting: data.temperatureSetting,
      onboardingCompleted: data.onboardingCompleted
    };
  },
});



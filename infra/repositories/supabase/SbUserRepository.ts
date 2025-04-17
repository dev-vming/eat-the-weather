import { UserRepository } from '@/domain/repositories/UserRepository';
import { supabase } from './Sbclient';

export const SbUserRepository = (): UserRepository => ({
  async findByEmail(email) {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) return null;
    return {
      user_id: data.user_id,
      email: data.email,
      nickname: data.nickname,
      provider: data.provider,
      onboarding_completed: data.onboardingCompleted,
      temperature_sensitivity: data.temperatureSetting,
      profile_image: data.profileImage,
    };
  },

  async findByNickname(nickname) {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('nickname', nickname)
      .single();

    if (error || !data) return false;
    else return true;
  },

  async create(user) {
    const { data, error } = await supabase
      .from('user')
      .insert({
        email: user.email,
        nickname: user.nickname,
        provider: user.provider,
        password: user.password,
        onboarding_completed: user.onboarding_completed,
        temperature_sensitivity: user.temperature_sensitivity,
      })
      .select()
      .single();

    if (error) throw new Error('유저 생성 실패');

    return {
      user_id: data.user_id,
      email: data.email,
      nickname: data.nickname,
      provider: data.provider,
      onboarding_completed: data.onboardingCompleted,
      temperature_sensitivity: data.temperatureSetting,
      profile_image: data.profileImage,
    };
  },
});

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
      password: data.password,
      email: data.email,
      nickname: data.nickname,
      provider: data.provider,
      onboarding_completed: data.onboarding_completed,
      temperature_sensitivity: data.temperature_sensitivity,
      profile_image: data.profile_image,
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
        profile_image: user.profile_image,
      })
      .select()
      .single();

    if (error) throw new Error('유저 생성 실패');

    return {
      user_id: data.user_id,
      email: data.email,
      nickname: data.nickname,
      provider: data.provider,
      onboarding_completed: data.onboarding_completed,
      temperature_sensitivity: data.temperature_sensitivity,
      profile_image: data.profile_image,
    };
  },
  async update(user_id, dto) {
    const { data, error } = await supabase
      .from('user')
      .update(dto)
      .eq('user_id', user_id)
      .select()
      .single();

    if (error || !data) throw new Error('유저 정보 수정 실패');

    return {
      user_id: data.user_id,
      email: data.email,
      nickname: data.nickname,
      provider: data.provider,
      onboarding_completed: data.onboarding_completed,
      temperature_sensitivity: data.temperature_sensitivity,
      profile_image: data.profile_image,
    };
  },
});

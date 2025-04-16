import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase URL이나 Anon Key가 환경 변수에 정의되어 있지 않습니다.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

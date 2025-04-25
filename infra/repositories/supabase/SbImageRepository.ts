import { ImageRepository } from '@/domain/repositories/ImageRepository';
import { supabase } from './Sbclient';

export const SbImageRepository = (): ImageRepository => ({
  async upload(uploadImageDto) {
    const bucket = 'eat-the-weather-image';

  // 1. 이미지 업로드
  const { error } = await supabase
    .storage
    .from(bucket)
    .upload(uploadImageDto.fileName, uploadImageDto.file, {
      cacheControl: '3600',
      upsert: false, // 중복 파일 방지
    });

  if (error) {
    throw new Error('이미지 업로드 실패: ' + error.message);
  }

  // 2. Public URL 얻기
  const { data } = supabase
    .storage
    .from(bucket)
    .getPublicUrl(uploadImageDto.fileName);

  return data.publicUrl;
  }
})


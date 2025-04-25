import { ImageRepository } from '@/domain/repositories/ImageRepository';
import { UploadImageDto } from './dto/UploadImageDto';

export const UploadImageusecase = async (
  imageRepository: ImageRepository,
  uploadImagedto: UploadImageDto,
): Promise<string> => {
  const imgUrl = await imageRepository.upload(uploadImagedto);
  if (imgUrl===null) throw new Error('이미지 업로드를 실패했습니다.');
  
  return imgUrl;
};
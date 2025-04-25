import { UploadImageDto } from '@/application/usecases/image/dto/UploadImageDto';

export interface ImageRepository {
  upload(uploadImageDto: UploadImageDto): Promise<string>;
}

export interface Post {
  postId: string; // UUID
  content: string;
  createdAt: Date;
  updatedAt: Date | null; //null일 시 수정되지 않음
  postImage: string | null; //null일 시 이미지 없음(default), 기본 이미지지
  userId: string; // UUID
  regionId: string; // UUID
}

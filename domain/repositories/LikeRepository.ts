export interface LikeRepository {
  addLike(userId: string, itemId: string): Promise<void>;
  removeLike(userId: string, itemId: string): Promise<void>;
  getLikesByUser(userId: string): Promise<string[]>;
  getLikesByItem(userId: string, itemId: string): Promise<string[]>;
}

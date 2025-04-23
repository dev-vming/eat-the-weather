import { supabase } from './Sbclient';
import { LikeRepository } from '@/domain/repositories/LikeRepository';

export const SbLikeRepository: LikeRepository = {
  /**
   * 좋아요 추가
   * @param userId 사용자 ID
   * @param post_id 좋아요를 추가할 게시글 ID
   */
  async addLike(userId: string, post_id: string): Promise<void> {
    const { error } = await supabase
      .from('likes')
      .insert({ user_id: userId, post_id: post_id });

    if (error) {
      throw new Error(`좋아요 추가 실패: ${error.message}`);
    }
  },

  /**
   * 좋아요 제거
   * @param userId 사용자 ID
   * @param post_id 좋아요를 제거할 게시글 ID
   */
  async removeLike(userId: string, post_id: string): Promise<void> {
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', userId)
      .eq('post_id', post_id);

    if (error) {
      throw new Error(`좋아요 제거 실패: ${error.message}`);
    }
  },

  /**
   * 특정 사용자가 좋아요한 게시글 ID 목록 조회
   * @param userId 사용자 ID
   * @returns 게시글 ID 배열
   */
  async getLikesByUser(userId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from('likes')
      .select('post_id')
      .eq('user_id', userId);

    if (error) {
      throw new Error(`사용자의 좋아요 조회 실패: ${error.message}`);
    }

    return data.map((like) => like.post_id);
  },

  /**
   * 특정 게시글에 좋아요를 누른 사용자 ID 목록 조회
   * @param itemId 게시글 ID
   * @returns 사용자 ID 배열
   */
  async getLikesByItem(itemId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from('likes')
      .select('user_id')
      .eq('post_id', itemId);

    if (error) {
      throw new Error(`게시글의 좋아요 조회 실패: ${error.message}`);
    }

    return data.map((like) => like.user_id);
  },
};

import { Comment } from '@/domain/entities/Comment';
import { CommentRepository } from '@/domain/repositories/CommentRepository';
import { CommentFilter } from '@/domain/repositories/filters/CommentFilter';
import { supabase } from './Sbclient';
import { GetCommentViewDto } from '@/application/usecases/comment/dto/GetCommentDto';

/**
 * Supabase 기반 댓글 Repository 구현체
 * - 댓글 생성, 조회, 삭제 등의 기능을 제공
 */
export const SbCommentRepository = (): CommentRepository => {
  return {
    /**
     * 댓글 개수 조회
     * @param filter - post_id 또는 created_at 기준으로 필터링 가능
     * @returns 조건에 맞는 댓글 수
     */
    async getCommentsCount(filter?: CommentFilter): Promise<number> {
      let query = supabase.from('comment_user_view').select('*', { count: 'exact', head: true });

      if (filter?.post_id) {
        query = query.eq('post_id', filter.post_id);
      }

      if (filter?.created_at) {
        query = query.eq('created_at', filter.created_at);
      }

      const { count, error } = await query;

      if (error) throw error;
      return count || 0;
    },

    /**
     * 모든 댓글 조회 (필터 적용 가능)
     * @param filter - post_id 또는 created_at 조건으로 필터링
     * @returns 댓글 리스트
     */
    async getAllComments(filter?: CommentFilter): Promise<GetCommentViewDto[]> {
      let query = supabase.from('comment_user_view').select('*');

      if (filter?.post_id) {
        query = query.eq('post_id', filter.post_id);
      }

      if (filter?.created_at) {
        query = query.eq('created_at', filter.created_at);
      }

      const { data, error } = await query;

      if (error) throw error;

      return (data as Comment[]).map((comment) => ({
        comment_id: comment.comment_id,
        post_id: comment.post_id,
        user_id: comment.user_id,
        nickname: comment.nickname ?? '',
        content: comment.content,
        created_at: comment.created_at,
      }));
    },

    /**
     * 댓글 ID로 단일 댓글 조회
     * @param comment_id - 조회할 댓글의 고유 ID
     * @returns 해당 댓글 데이터 (없으면 null)
     */
    async getCommentsById(comment_id: string): Promise<Comment | null> {
      const { data, error } = await supabase
        .from('comment_user_view')
        .select('*')
        .eq('comment_id', comment_id)
        .single();

      if (error) return null;
      return data as Comment;
    },

    /**
     * 특정 게시글에 달린 모든 댓글 조회
     * @param post_id - 게시글의 ID
     * @returns 해당 게시글의 댓글 배열
     */
    async getCommentsPostId(post_id: string): Promise<GetCommentViewDto[]> {
      const { data, error } = await supabase
        .from('comment_user_view')
        .select('*')
        .eq('post_id', post_id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as GetCommentViewDto[];
    },

    /**
     * 댓글 생성
     * @param comment - 댓글 데이터 (comment_id, created_at 제외)
     * @returns 생성된 댓글 데이터
     */
    async create(comment: Omit<Comment, 'comment_id' | 'created_at'>): Promise<Comment> {
      const { data, error } = await supabase
        .from('comment')
        .insert([comment])
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase insert 실패:', error);
        throw error;
      }
      return data as Comment;
    },

    /**
     * 댓글 삭제
     * @param comment_id - 삭제할 댓글의 고유 ID
     */
    async delete(comment_id: string): Promise<void> {
      const { error } = await supabase
        .from('comment')
        .delete()
        .eq('comment_id', comment_id);

      if (error) {
        console.error('❌ Supabase delete 실패:', error);
        throw error;
      }
    }
  };
};

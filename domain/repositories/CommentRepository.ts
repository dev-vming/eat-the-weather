import { DeleteCommentUsecase } from "@/application/usecases/comment/DeleteCommentUsecase";
import { Comment } from "../entities/Comment";
import { CommentFilter } from "./filters/CommentFilter";

export interface CommentRepository {
    getCommentsCount(filter: CommentFilter): Promise<number>;
    getAllComments(filter: CommentFilter): Promise<Comment[]>;
    getCommentsById(comment_id: string): Promise<Comment | null>;
    getCommentsPostId(post_id: string): Promise<Comment[]>

    create(comment: Omit<Comment, "comment_id" | "created_at">        
    ): Promise<Comment>;

    delete(comment_id: string): Promise<void>;
}

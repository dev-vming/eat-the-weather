import { PostRepository } from '@/domain/repositories/PostRepository';


export const DeletePostUsecase = async (
    PostRepository: PostRepository, // 게시물 DB 작업을 처리할 repository
    post_id: string // 삭제할 게시물의 ID
): Promise<boolean> => {
    try {
        // Repository를 통해 해당 post_id의 게시물 삭제 요청
        await PostRepository.delete(post_id);

        // 삭제 성공 시 true 반환
        return true;
    } catch (error) {
        // 오류 발생 시 로그 출력 및 예외 던지기
        console.error('❌ 게시물 삭제 실패:', error);
        throw new Error('게시물 삭제 중 오류가 발생했습니다.');
    }
};
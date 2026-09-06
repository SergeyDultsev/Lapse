import styles from './PostCreateModal.module.scss';
import { PostCreateForm } from '@/features';
import { ButtonBase } from '@/shared';
import { useCreatePost } from '@features/post/post-create/hooks/useCreatePost';

const PostCreateModal: React.FC = () => {
    const {
        postData,
        setPost,
        savePost,
        sendPost,
    } = useCreatePost();
    
    return (
        <div className={styles['post-modal']}>
            <div className={styles['post-modal__header']}>
                <p className={styles['post-modal__header__title']}>Новый пост</p>
                <ButtonBase
                    variant={'primary'}
                    size={'sm'}
                    onClick={savePost}
                >
                    Сохранить в черновик
                </ButtonBase>
            </div>
            <PostCreateForm
                title={postData.title}
                textContent={postData.textContent}
                setPost={setPost}
                sendPost={sendPost}
            />
        </div>
    );
};

export default PostCreateModal;
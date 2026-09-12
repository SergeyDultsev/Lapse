import styles from './PostCreateModal.module.scss';
import PostCreateForm from '../post-create-form/PostCreateForm';
import { ButtonBase } from '@shared/ui/button';
import { useCreatePost } from '@features/post/post-create/lib/useCreatePost';
import { useCloseModal } from '@shared/ui/modal';

const PostCreateModal: React.FC = () => {
    const {
        postData,
        setPost,
        sendPost,
        debouncedSavePost,
    } = useCreatePost();

    const closeModal = useCloseModal();

    const handleSendPost = () => {
        sendPost();
        closeModal();
    };

    return (
        <div className={styles['post-modal']}>
            <div className={styles['post-modal__header']}>
                <p className={styles['post-modal__header__title']}>Новый пост</p>
                <ButtonBase
                    variant={'primary'}
                    size={'sm'}
                    onClick={debouncedSavePost}
                >
                    Сохранить в черновик
                </ButtonBase>
            </div>
            <PostCreateForm
                title={postData.title}
                textContent={postData.textContent}
                setPost={setPost}
                sendPost={handleSendPost}
            />
        </div>
    );
};

export default PostCreateModal;
import styles from './PostCreateModal.module.scss';
import PostCreateForm from '../post-create-form/PostCreateForm';
import { UIButton } from '@shared/ui/ui-button/ui/UIButton';
import { useCreatePost } from '@modules/posts/lib/useCreatePost';
import { useModal } from '@/providers/ModalProvider';

const PostCreateModal: React.FC = () => {
    const {
        postData,
        setPost,
        sendPost,
        debouncedSavePost,
    } = useCreatePost();
    
    const modal = useModal();

    const handleSendPost = async () => {
        try {
            await sendPost();
            modal?.closeModal();
        } catch (error) {
            console.error('Failed to create post:', error);
        }
    };

    return (
        <div
            className={styles['post-modal']}
            onClick={(e) => e.stopPropagation()}
        >
            <div className={styles['post-modal__header']}>
                <p className={styles['post-modal__header__title']}>Новый пост</p>
                <UIButton
                    variant={'primary'}
                    size={'sm'}
                    onClick={debouncedSavePost}
                >
                    Сохранить в черновик
                </UIButton>
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
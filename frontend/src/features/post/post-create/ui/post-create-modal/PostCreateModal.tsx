import styles from './PostCreateModal.module.scss';
import { PostCreateForm } from '@/features';
import { ButtonBase } from '@/shared';

const PostCreateModal: React.FC = () => {
    return (
        <div className={styles['post-modal']}>
            <div className={styles['post-modal__header']}>
                <p className={styles['post-modal__header__title']}>Новый пост</p>
                <ButtonBase
                    variant={'primary'}
                    size={'sm'}
                >
                    Сохранить в черновик
                </ButtonBase>
            </div>
            <PostCreateForm />
        </div>
    );
};

export default PostCreateModal;
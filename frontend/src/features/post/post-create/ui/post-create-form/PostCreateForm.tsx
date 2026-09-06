import styles from './PostCreateFrom.module.scss';
import { ButtonBase } from '@/shared';

const PostCreateForm: React.FC = () => {
    return (
        <form className={styles['post-form']}>
            <textarea className={styles['post-form__textarea']} placeholder={'Написать пост'}></textarea>
            <div className={styles['post-form__btns']}>
                <ButtonBase
                    variant={'primary'}
                    size={'sm'}
                >
                    Опубликовать
                </ButtonBase>
                <ButtonBase
                    variant={'primary'}
                    size={'sm'}
                >
                    Эмодзи
                </ButtonBase>
            </div>
        </form>
    );
};

export default PostCreateForm;
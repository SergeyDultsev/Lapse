import styles from './PostCreateFrom.module.scss';
import { ButtonBase } from '@/shared';

interface IPostCreateFormProps {
    title: string;
    textContent: string;
    setPost: (fieldName: string, value: string | number) => void;
    sendPost: () => void;
}

const PostCreateForm: React.FC<IPostCreateFormProps> = ({
    title,
    textContent,
    setPost,
    sendPost,
}) => {
    return (
        <form className={styles['post-form']}>
            <input
                className={styles['post-form__input']}
                name={'title'}
                type={'text'}
                placeholder={'Заголовок'}
                value={title}
                onChange={(e) => setPost('title', e.target.value)}
            />
            <textarea
                className={styles['post-form__textarea']}
                placeholder={'Написать пост'}
                value={textContent}
                onChange={(e) => setPost('textContent', e.target.value)}
            ></textarea>
            <div className={styles['post-form__btns']}>
                <ButtonBase
                    variant={'primary'}
                    size={'sm'}
                    onClick={sendPost}
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
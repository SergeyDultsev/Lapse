import styles from './PostNotFound.module.scss';

const PostsNotFound: React.FC = () => {
  return (
      <div className={styles['posts-not-found']}>
          Нету постов
      </div>
  );
};

export default PostsNotFound;
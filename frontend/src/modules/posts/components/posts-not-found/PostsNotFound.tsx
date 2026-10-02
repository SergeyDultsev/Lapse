import styles from './PostNotFound.module.scss';

const PostsNotFound: React.FC = () => {
  return (
      <div className={styles['not-found']}>
          <h2 className={styles['not-found__title']}>
              Нету постов
          </h2>
          <div className={styles['not-found__body']}>

          </div>
      </div>
  );
};

export default PostsNotFound;
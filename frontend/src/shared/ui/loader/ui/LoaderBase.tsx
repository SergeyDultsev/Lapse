import styles from './LoaderBase.module.scss';

const LoaderBase: React.FC = () => {
    return (
        <span className={styles['loader-base']}/>
    );
};

export default LoaderBase;
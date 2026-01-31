import styles from './LoaderSpinner.module.scss';

const LoaderSpinner: React.FC = () => {
    return (
        <span className={styles['loader-spinner']}/>
    );
};

export default LoaderSpinner;
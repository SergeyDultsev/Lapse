import styles from './UILoader.module.scss';

const UILoader: React.FC = () => {
    return (
        <span className={styles['loader-base']}/>
    );
};

export default UILoader;
'use client';

import styles from './AuthModal.module.scss';
import AuthForm from '@features/auth/ui/auth-form/AuthForm';

const AuthModal: React.FC = () => {
    return (
        <div className={styles['auth-modal']}>
            <AuthForm mode={'login'} />
        </div>
    );
};

export default AuthModal;
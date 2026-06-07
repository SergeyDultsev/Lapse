'use client';

import styles from './AuthModal.module.scss';
import AuthForm from '@features/auth/ui/auth-form/AuthForm';
import { tCredentialsForm } from '@features/auth/config/auth.configs';

const AuthModal: React.FC<{ mode: tCredentialsForm }> = ({ mode }) => {
    return (
        <div className={styles['auth-modal']}>
            <AuthForm mode={mode} />
        </div>
    );
};

export default AuthModal;
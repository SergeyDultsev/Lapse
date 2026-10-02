'use client';

import styles from './AuthModal.module.scss';
import AuthForm from '../auth-form/AuthForm';
import { tCredentialsForm } from '@shared/config/auth.configs';

const AuthModal: React.FC<{ mode: tCredentialsForm }> = ({ mode }) => {
    return (
        <div
            className={styles['auth-modal']}
            onClick={(e) => e.stopPropagation()}
        >
            <AuthForm mode={mode} />
        </div>
    );
};

export default AuthModal;
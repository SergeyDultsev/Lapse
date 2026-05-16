'use client';

import styles from './LoginModal.scss';
import { useModalStore } from '@providers/modal/model/modal.store';
import LoginForm from '@features/auth/login/ui/login-form/LoginForm';

const LoginModal: React.FC = () => {
    const modalStore = useModalStore();
    
    return (
        <div className={styles['login-modal']}>
            <LoginForm />
        </div>
    );
};

export default LoginModal;
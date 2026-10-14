'use client';

import { useEffect } from 'react';
import { onAuthFailure } from '@shared/api';
import AuthModal from '@modules/auth/components/auth-modal/AuthModal';
import { useModal } from './ModalProvider';

/**
 * Слушает событие «сессия истекла и обновить токен не удалось»
 * и открывает окно авторизации.
 */
export const AuthFailureWatcher = () => {
    const { openModal } = useModal();

    useEffect(() => {
        return onAuthFailure(() => {
            openModal(<AuthModal mode={'login'} />);
        });
    }, [openModal]);

    return null;
};

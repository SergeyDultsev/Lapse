'use client';

import React, { ReactNode } from 'react';
import { useModalName, useCloseModal } from '@/providers/modal/model/modal.store';
import styles from '../ui/ModalProvider.module.scss';

const ModalProvider = ({ children }: { children: ReactNode }) => {
    const modalName = useModalName();
    const closeModal = useCloseModal();

    if (modalName === null) {
        return <>{children}</>;
    }

    return (
        <>
            {children}
            <div
                className={styles['modal-wrapper']}
                onClick={closeModal}
            >
                <div>Модалка</div>
            </div>
        </>
    );
};

export default ModalProvider;
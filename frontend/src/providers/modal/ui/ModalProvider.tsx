'use client';

import React, { ReactNode } from 'react';
import styles from '../ui/ModalProvider.module.scss';
import { useModalName, useCloseModal } from '@/providers/modal/model/modal.store';
import { ModalManager } from '@/shared';

const ModalProvider = ({ children }: { children: ReactNode }) => {
    const modalName = useModalName();
    const closeModal = useCloseModal();

    if (modalName === null) {
        return <>{children}</>;
    }

    return (
        <>
            {children}
            <section
                className={styles['modal-wrapper']}
                onClick={closeModal}
            >
                <ModalManager name={modalName} />
            </section>
        </>
    );
};

export default ModalProvider;
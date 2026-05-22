'use client';

import React, { ReactNode } from 'react';
import styles from '../ui/ModalProvider.module.scss';
import { useModal, useCloseModal } from '@/providers/modal/model/modal.store';

const ModalProvider = ({ children }: { children: ReactNode }) => {
    const modal  = useModal();
    const closeModal = useCloseModal();

    if (modal === null) {
        return <>{children}</>;
    }

    return (
        <>
            {children}

            <section
                className={styles['modal-wrapper']}
                onClick={closeModal}
            >
                <div onClick={(e) => e.stopPropagation()}>
                    {modal}
                </div>
            </section>
        </>
    );
};

export default ModalProvider;
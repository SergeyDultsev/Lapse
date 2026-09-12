'use client';

import React, { ReactNode } from 'react';
import styles from './ModalRoot.module.scss';
import { useModal, useCloseModal } from '@shared/ui/modal/model/modal.store';

const ModalRoot = ({ children }: { children: ReactNode }) => {
    const modal = useModal();
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

export default ModalRoot;

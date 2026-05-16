import React, { Suspense, JSX, lazy } from 'react';
import { LoaderBase } from '@/shared';

const MODALS: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
    'login': lazy(() => import('@/features/auth/login/ui/login-modal/LoginModal')),
};

const ModalManager: React.FC<{ name: string; noClose?: () => void }> = ({ name }) => {
    const ModalComponent = MODALS[name];

    if (!ModalComponent) {
        return null;
    }
    
    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Suspense fallback={<LoaderBase />}>
                <ModalComponent />
            </Suspense>
        </div>
    );
};

export default ModalManager;
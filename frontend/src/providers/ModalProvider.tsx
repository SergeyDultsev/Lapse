import { 
    createContext,
    useCallback, useContext,
    useMemo, 
    useState, 
} from 'react';

type tModalContext = {
    isOpen: React.ReactNode | null;
    openModal: (modal: React.ReactNode) => void;
    closeModal: () => void;
};

type tModalProviderProps = {
    children: React.ReactNode;
};

export const ModalContext = createContext<tModalContext | null>(null);

export const useModal = (): tModalContext => {
    const modal = useContext(ModalContext) as tModalContext | null;
    if (!modal) {
        throw new Error('useModal error');
    }
    return modal;
};

export const ModalProvider: React.FC<tModalProviderProps> = ({ children }) => {
    const [isOpen, setOpen] = useState<React.ReactNode | null>(null);

    const openModal = useCallback((modal: React.ReactNode) => {
        setOpen(modal);
    }, []);

    const closeModal = useCallback(() => {
        setOpen(null);
    }, []);

    const value = useMemo<tModalContext>(() => ({
        isOpen,
        openModal,
        closeModal,
    }), [isOpen, openModal, closeModal]);

    return (
        <ModalContext.Provider value={value}>
            {children}

            {isOpen && (
                <div
                    className={'modal-overlay'}
                    onClick={closeModal}
                >
                    {isOpen}
                </div>
            )}
        </ModalContext.Provider>
    );
};
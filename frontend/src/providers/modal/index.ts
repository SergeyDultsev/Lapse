export { default as ModalProvider } from '@/providers/modal/ui/ModalProvider';

export {
    useSetModal,
    useCloseModal,
    useModalName,
} from '@providers/modal/model/modal.store';

export type { 
    IModal,
    IModalStore, 
} from '@providers/modal';
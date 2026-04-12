import { create } from 'zustand/react';
import { 
    tModalNames,
    IInitialState, 
    IModalStore 
} from '@providers/modal/types/IModal';
import type { StateCreator } from 'zustand';

const initialState: IInitialState = {
    modalName: null,
}

const modalStore: StateCreator<IModalStore> = (set, get) => ({
        ...initialState,
        setModal: (modalName) => {
            set({ modalName })
        },
        closeModal: () => {
            set({ modalName: null })
        },
    }
);

export const useModalStore = create<IModalStore>(modalStore);

export const useSetModal = () => useModalStore(state => state.setModal);
export const useCloseModal = () => useModalStore(state => state.closeModal);
export const useModalName = () => useModalStore(state => state.modalName);
import { create } from 'zustand/react';
import {
    IInitialState, 
    IModalStore, 
} from '@providers/modal/types/IModal';
import type { StateCreator } from 'zustand';

const initialState: IInitialState = {
    modal: null,
};

const modalStore: StateCreator<IModalStore> = (set, get) => ({
        ...initialState,
        openModal: (modal) => {
            set({ modal });
        },
        closeModal: () => {
            set({ modal: null });
        },
    }
);

export const useModalStore = create<IModalStore>(modalStore);

export const useOpenModal = () => useModalStore(state => state.openModal);
export const useCloseModal = () => useModalStore(state => state.closeModal);
export const useModal = () => useModalStore(state => state.modal);
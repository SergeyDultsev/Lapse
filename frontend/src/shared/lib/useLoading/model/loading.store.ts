import { create } from 'zustand/react';
import { type StateCreator } from 'zustand';
import {
    ILoadingStore,
    IInitialState,
} from '@shared/lib/useLoading/types/ILoading';

const initialState: IInitialState = {
    readyComponents: new Set(),
};

const loadingStore: StateCreator<ILoadingStore> = (set, get) => ({
        ...initialState,
        setReady: (id) => {
            set((state) => ({
                readyComponents: new Set(state.readyComponents).add(id),
            }));
        },
        reset: () => {
            set({ readyComponents: new Set() });
        },
        ready: (idx) => {
          idx.every((id) => get().readyComponents.has(id));
        },
    }
);

export const useLoadingStore = create<ILoadingStore>()(loadingStore);

export const useSetReady = () => useLoadingStore(state => state.setReady);
export const useReset = () => useLoadingStore(state => state.reset);
export const useReady = () => useLoadingStore(state => state.ready);
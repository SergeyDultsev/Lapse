export type tModalNames = 'auth';

export interface IInitialState {
    modalName: tModalNames | null;
}

export interface IActions {
    setModal: (modal: tModalNames) => void,
    closeModal: () => void,
}

export interface IModalStore extends IInitialState, IActions {}
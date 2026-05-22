export interface IInitialState {
    modal: React.ReactElement | null;
}

export interface IActions {
    openModal: (modal: React.ReactElement) => void,
    closeModal: () => void,
}

export interface IModalStore extends IInitialState, IActions {}
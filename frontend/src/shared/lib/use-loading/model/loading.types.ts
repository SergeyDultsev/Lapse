export interface IInitialState {
    readyComponents: Set<string>;
}

export interface IActions {
    setReady: (id: string) => void;
    reset: () => void;
    ready: (idx: string[]) => void;
}

export interface ILoadingStore extends IInitialState, IActions {}
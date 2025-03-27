import { makeAutoObservable, action } from "mobx";

interface SelectedItem {
    id: string;
    title: string;
    price: number;
}

class SelectStore {
    isOpen: boolean = false;
    selected: SelectedItem = { id: '', title: '', price: 0 };

    constructor () {
        makeAutoObservable(this, {
            setIsOpen: action,
            setSelected: action
        })
    }

    /*
    * Открывает выпадающее меню
    */
    setIsOpen(state: boolean) {
        this.isOpen = state;
    }

    /*
    * Метод меняет выбранный элемент
    */
    setSelected(newSelected: {id: string, title: string, price: number}): void {
        this.selected = newSelected;
    }
}

export default new SelectStore;
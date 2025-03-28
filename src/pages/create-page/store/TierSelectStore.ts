import ITier from "@/entities/tier/model/types/iTier";
import { makeAutoObservable, action } from "mobx";

class SelectStore {
    isOpen: boolean = false;
    selected: ITier = { tierId: '', title: '', price: 0, description: '' };

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
    setSelected(newSelected: ITier): void {
        this.selected = newSelected;
    }
}

export default new SelectStore;
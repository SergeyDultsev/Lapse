import { makeAutoObservable, action } from "mobx";
import TierSelectStore from "@pages/create-page/store/TierSelectStore";

class CreatePostStore {
    selectedTier = TierSelectStore.selected;

    dataForm = {
        tier_id: this.selectedTier.tier_id,
        title: '',
        content: '',
        preview_url: null as File | null,
    };

    constructor () {
        makeAutoObservable(this, {
            setTitle: action,
            setContent: action,
            setPreview: action,
        });
    }

    setTitle(title: string) {
        this.dataForm.title = title;
    }

    setContent(body: string) {
        this.dataForm.content = body;
    }

    setPreview(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] || null;
        this.dataForm.preview_url = file;
    }

    resetForm() {
        this.dataForm.tier_id = "";
        this.dataForm.title = "";
        this.dataForm.content = "";
        this.dataForm.preview_url = null;
    }
}

export default new CreatePostStore();
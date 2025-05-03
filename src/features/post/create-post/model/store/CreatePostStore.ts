import { makeAutoObservable, action } from "mobx";

class CreatePostStore {
    title: string = "";
    body: string = "";
    preview: File | null = null;

    constructor () {
        makeAutoObservable(this, {
            setTitle: action,
            setBody: action,
            setPreview: action,
        });
    }

    setTitle(title: string) {
        this.title = title;
    }

    setBody(body: string) {
        this.body = body;
    }

    setPreview(preview: File | null) {
        this.preview = preview;
    }

    resetForm() {
        this.title = "";
        this.body = "";
        this.preview = null;
    }
}

export default new CreatePostStore();
import React from "react";
import styles from "./CreatePostForm.module.scss";
import CreatePostStore from "@features/post/create-post/store/CreatePostStore";
import InputDefault from "@/shared/ui/input/InputDefault";
import TextareaDefault from "@/shared/ui/textarea/TextareaDefault";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";
import FileUpload from "@/shared/ui/file/FileUpload";
import { observer } from "mobx-react-lite";

const CreatePostForm: React.FC = observer(() => {
    const store = CreatePostStore;

    const handlePublish = () => {
        store.resetForm();
    };

    return (
        <form className={styles["create-form"]} onSubmit={(e) => e.preventDefault()}>
            <FileUpload 
                placeholder={"Загрузить превью поста"} 
                onChange={(event) => store.setPreview(event)} 
            />
            <InputDefault 
                placeholder={"Заголовок поста"} 
                type="text" 
                value={store.title}
                onChange={(event) => store.setTitle(event.target.value)}
            />
            <TextareaDefault 
                placeholder={"Тело поста"} 
                value={store.body}
                onChange={(event) => store.setBody(event.target.value)}
            />
            <ButtonDefault 
                active={!!store.title && !!store.body}
                type="button" 
                onClick={handlePublish}
            >
                Опубликовать
            </ButtonDefault>
        </form>
    );
});

export default CreatePostForm;
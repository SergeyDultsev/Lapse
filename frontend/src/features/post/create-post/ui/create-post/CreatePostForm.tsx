import React from "react";
import styles from "./CreatePostForm.module.scss";
import CreatePostStore from "@features/post/create-post/store/CreatePostStore";
import InputDefault from "@/shared/ui/input/InputDefault";
import TextareaDefault from "@/shared/ui/textarea/TextareaDefault";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";
import FileUpload from "@/shared/ui/file/FileUpload";
import { observer } from "mobx-react-lite";
import PostStore from "@entities/post/model/store/PostStore";

const CreatePostForm: React.FC = observer(() => {
    const handlePublish = () => {
        PostStore.createPost();
        CreatePostStore.resetForm();
    };

    return (
        <form className={styles["create-form"]} onSubmit={(e) => e.preventDefault()}>
            <FileUpload
                placeholder={"Загрузить превью поста"}
                onChange={(event) => CreatePostStore.setPreview(event)}
            />
            <InputDefault 
                placeholder={"Заголовок поста"} 
                type="text" 
                value={CreatePostStore.dataForm.title}
                onChange={(event) => CreatePostStore.setTitle(event.target.value)}
            />
            <TextareaDefault 
                placeholder={"Тело поста"} 
                value={CreatePostStore.dataForm.content}
                onChange={(event) => CreatePostStore.setContent(event.target.value)}
            />
            <ButtonDefault 
                active={!!CreatePostStore.dataForm.title && !!CreatePostStore.dataForm.content}
                type="button" 
                onClick={handlePublish}
            >
                Опубликовать
            </ButtonDefault>
        </form>
    );
});

export default CreatePostForm;
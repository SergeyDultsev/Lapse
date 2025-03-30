import React from "react";
import styles from "./CreatePostForm.module.scss";
import InputDefault from "@/shared/ui/input/InputDefault";
import TextareaDefault from "@/shared/ui/textarea/TextareaDefault";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";
import FileUpload from "@/shared/ui/file/FileUpload";

const CreatePostForm: React.FC = () => {
    return (
        <form className={styles["create-form"]}>
            <FileUpload placeholder={"Загрузить превью поста"}/>
            <InputDefault placeholder={"Заголовок поста"} type={'text'}/>
            <TextareaDefault placeholder={"Тело поста"}/>
            <ButtonDefault 
                active={false} 
                type="button" 
            >
                Опубликовать
            </ButtonDefault>
        </form>
    );
}

export default CreatePostForm;
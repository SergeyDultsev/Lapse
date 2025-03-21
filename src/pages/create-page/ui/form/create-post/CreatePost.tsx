import React from "react";
import styles from "@/pages/create-page/ui/form/CreateForm.module.scss";
import InputDefault from "@/shared/ui/input/InputDefault";

const CreatePost: React.FC = () => {
    return (
        <form className={styles["create-form"]}>
            <InputDefault placeholder={"Заголовок поста"} type={'text'}/>
        </form>
    );
}

export default CreatePost;
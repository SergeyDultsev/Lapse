import React from "react";
import styles from "./CreateTierForm.module.scss";
import InputDefault from "@/shared/ui/input/InputDefault";
import TextareaDefault from "@/shared/ui/textarea/TextareaDefault";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";

const CreateTierForm: React.FC = () => {
    return (
        <form className={styles["create-form"]}>
            <InputDefault placeholder={"Заголовок подписки"} type={'text'}/>
            <InputDefault placeholder={"Цена в месяц"} type={'number'}/>
            <TextareaDefault placeholder={"Описание подписки"}/>
            <ButtonDefault 
                active={false} 
                type="button" 
            >
                Опубликовать
            </ButtonDefault>
        </form>
    );
}

export default CreateTierForm;
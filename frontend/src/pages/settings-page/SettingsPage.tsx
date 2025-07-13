"use client";

import React from "react";
import styles from './SettingsPage.module.scss';
import { observer } from "mobx-react-lite";
import { useRouterMiddleware } from "@/middleware/useRouterMiddleware";
import ButtonDefault from "@shared/ui/button/ButtonDefault";
import InputDefault from "@shared/ui/input/InputDefault";
import FileUpload from "@shared/ui/file/FileUpload";
import TextareaDefault from "@shared/ui/textarea/TextareaDefault";
import SettingsModel from "@pages/settings-page/model/SettingsModel";

const SettingsPage: React.FC = observer(() => {
    return (
        <main className="main">
            <section className={styles["create"]}>
                <form className={styles["create-form"]} onSubmit={(e) => e.preventDefault()}>
                    <FileUpload
                        placeholder={"Загрузить автарку"}
                        onChange={(event) => SettingsModel.setFormData('avatar_url', event.target.value)}
                    />
                    <InputDefault
                        placeholder={"Имя"}
                        type="text"
                        value={SettingsModel.dataForm.name}
                        onChange={(event) => SettingsModel.setFormData('name', event.target.value)}
                    />
                    <InputDefault
                        placeholder={"Фамилия"}
                        type="text"
                        value={SettingsModel.dataForm.surname}
                        onChange={(event) => SettingsModel.setFormData('surname', event.target.value)}
                    />
                    <TextareaDefault
                        placeholder={"О себе"}
                        value={SettingsModel.dataForm.abort}
                        onChange={(event) => SettingsModel.setFormData('about', event.target.value)}
                    />
                    <ButtonDefault
                        active={false}
                        type="button"
                    >
                        Сохранить
                    </ButtonDefault>
                </form>
            </section>
        </main>
    );
})

export default useRouterMiddleware(SettingsPage);
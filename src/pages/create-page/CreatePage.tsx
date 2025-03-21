"use client"

import React from "react";
import styles from "./CraetePage.module.scss";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";
import CreatePost from "./ui/form/create-post/CreatePost"

const CreatePage: React.FC = (() => {
    return (
        <main className="main">
            <section className={styles["create"]}>
                <div className={styles["create__options"]}>
                    <ButtonDefault active={true} type="button" style={{ width: "100%" }} >
                        Пост
                    </ButtonDefault>
                    <ButtonDefault active={false} type="button" style={{ width: "100%" }}>
                        VIP-Подписка
                    </ButtonDefault>
                </div>
                <CreatePost/>
            </section>
        </main>
    );
});

export default CreatePage;
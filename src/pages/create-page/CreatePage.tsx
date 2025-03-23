"use client"

import React from "react";
import styles from "./CraetePage.module.scss";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";
import CreatePageStore from "@/features/post/create-post/model/store/CreatePageStore";
import {observer} from "mobx-react-lite";
import CreatePost from "@/features/post/create-post/ui/create-post/CreatePostForm";
import CreateTier from "@/features/tier/create-tier/ui/CreateTierForm";
import CartInfo from "@/widgets/cart-info/CartInfo";
import VisibilityOption from "./ui/visibility-option/VisibilityOption";

const CreatePage: React.FC = observer(() => {
    /*
    * Функция принимает новое сотояние формы
    */
    const changeForm = ((state: string) => {
        CreatePageStore.changeFormState(state);
    })

    return (
        <main className="main">
            <section className={styles["create"]}>
                <div className={styles["create__options"]}>
                    <ButtonDefault
                        onClick={() => changeForm("post")}
                        active={CreatePageStore.stateForm === "post"} 
                        type="button" 
                        style={{ width: "100%" }}
                    >
                        Пост
                    </ButtonDefault>
                    <ButtonDefault 
                        onClick={() => changeForm("tier")}
                        active={CreatePageStore.stateForm === "tier"} 
                        type="button" 
                        style={{ width: "100%" }}
                    >
                        VIP-Подписка
                    </ButtonDefault>
                </div>

                {CreatePageStore.stateForm === "post" && (
                    <CreatePost/>
                )}

                {CreatePageStore.stateForm === "tier" && (
                    <CreateTier/>
                )}

            </section>

            {CreatePageStore.stateForm === "post" && (
                <aside className="aside">
                    <CartInfo nameCart={"Видимость"} children={
                        <VisibilityOption/>
                    }/>
                </aside>
            )}
        </main>
    );
});

export default CreatePage;
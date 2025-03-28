"use client"

import React from "react";
import styles from "./CraetePage.module.scss";
import {observer} from "mobx-react-lite";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";
import CreatePageStore from "@/pages/create-page/store/CreatePageStore";
import CreatePost from "@/features/post/create-post/ui/create-post/CreatePostForm";
import CreateTier from "@/features/tier/create-tier/ui/CreateTierForm";
import CartInfo from "@/widgets/cart-info/CartInfo";
import VisibilityOption from "./ui/visibility-option/VisibilityOption";

const CreatePage: React.FC = observer(() => {
    const stateForm = CreatePageStore.stateCreateForm;

    return (
        <main className="main">
            <section className={styles["create"]}>
                <div className={styles["create__options"]}>
                    <ButtonDefault
                        onClick={() => CreatePageStore.changeFormState("post")}
                        active={stateForm === "post"} 
                        type="button" 
                        style={{ width: "100%" }}
                    >
                        Пост
                    </ButtonDefault>
                    <ButtonDefault 
                        onClick={() => CreatePageStore.changeFormState("tier")}
                        active={stateForm === "tier"} 
                        type="button" 
                        style={{ width: "100%" }}
                    >
                        VIP-Подписка
                    </ButtonDefault>
                </div>

                {stateForm === "post" && (
                    <CreatePost/>
                )}

                {stateForm === "tier" && (
                    <CreateTier/>
                )}

            </section>

            {stateForm === "post" && (
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
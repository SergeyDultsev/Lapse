import React from "react";
import styles from "./ProfileInfo.module.scss"
import ButtonDefault from "@/shared/ui/button/ButtonDefault";

const ProfileInfo: React.FC = (() => {
    return (
        <section className={styles['profile-info']}>
            <div className={styles['user-info']}>
                <img className={styles['user-info__avatar']}
                    src="#"
                    alt="avatar" 
                    loading="lazy" 
                />
                <h2 className={styles['user-info__username']}>
                    Сергей Дульцев
                </h2>
                <div className={styles['user-info__subs']}>
                    <p className={styles['user-info__subs-count']}>1000 подписок</p>
                    <p className={styles['user-info__subs-count']}>1000 подписчиков</p>
                </div>
                <p className={styles['user-info__descr']}>
                    Описание профиля
                </p>

                <ButtonDefault 
                    style={{ padding: "11px 29px", margin: "20px 0 0 0"  }} 
                    children={"Редактировать профиль"} 
                    name={"editUser"} 
                    type={"button"} 
                    active={false}
                />
            </div>
        </section>
    );
});

export default ProfileInfo;

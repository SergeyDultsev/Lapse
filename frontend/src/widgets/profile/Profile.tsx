"use client";

import React from "react";

import styles from './Profile.module.scss'

const Profile: React.FC = () => {
    return (
        <section className={styles["profile"]}>
            <div className={styles["profile-info"]}>
                <div className={styles["profile-info__image"]}>

                </div>
                <div className={styles["profile-info__content"]}>
                    <h2 className={styles["profile-info__content__name"]}>Сергей Дульцев</h2>
                    <p className={styles["profile-info__content__data"]}>CEO и основатель платформы.</p>
                    <p className={styles["profile-info__content__data"]}>15470 подписчиков</p>
                </div>
            </div>
            <div className={styles["profile-info__bts"]}>

            </div>
        </section>
    );
}

export default Profile;
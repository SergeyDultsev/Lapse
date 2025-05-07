import React from "react";
import styles from "./ProfileInfo.module.scss"
import avatar from "@/assets/img/avatar.jpg";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";

interface iProfileInfo {
    full_name: string,
    followers: number,
    readers: number,
    about: string
}

const ProfileInfo: React.FC<iProfileInfo> = ({full_name, followers, readers, about}) => {
    return (
        <section className={styles['profile-info']}>
            <div className={styles['user-info']}>
                <img className={styles['user-info__avatar']}
                    src={avatar.src}
                    alt="avatar" 
                    loading="lazy" 
                />
                <h2 className={styles['user-info__username']}>
                    {full_name}
                </h2>
                <div className={styles['user-info__subs']}>
                    <p className={styles['user-info__subs-count']}>{followers} подписок</p>
                    <p className={styles['user-info__subs-count']}>{readers} подписчиков</p>
                </div>
                <p className={styles['user-info__descr']}>
                    {about}
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
};

export default ProfileInfo;

import React from "react";
import styles from "./ProfileInfo.module.scss"
import AvatarDefault from "@/assets/img/avatar.jpg";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";
import {router} from "next/client";

interface iProfileInfo {
    user_id: string,
    avatar: string,
    full_name: string,
    subscriber: number,
    subscriptions: number,
    about: string,
    is_self: boolean,
    is_follow: boolean
}

const ProfileInfo: React.FC<iProfileInfo> = ({user_id, avatar, full_name, subscriber, subscriptions, about, is_self, is_follow}) => {

    const toRouteSetting = () => {
        router.push('/settings')
    }


    return (
        <section className={styles['profile-info']}>
            <div className={styles['user-info']}>
                {avatar? (
                    <img className={styles['user-info__avatar']}
                         src={avatar}
                         alt="avatar"
                         loading="lazy"
                    />
                ) : (
                    <img className={styles['user-info__avatar']}
                         src={AvatarDefault.src}
                         alt="avatar"
                         loading="lazy"
                    />
                )}
                <h2 className={styles['user-info__username']}>
                    {full_name}
                </h2>
                <div className={styles['user-info__subs']}>
                    <p className={styles['user-info__subs-count']}>{subscriber} подписок</p>
                    <p className={styles['user-info__subs-count']}>{subscriptions} подписчиков</p>
                </div>

                {about ? (
                    <p className={styles['user-info__descr']}>
                        {about}
                    </p>
                ) : (
                    ""
                )}

                {is_follow && !is_self && (
                    <ButtonDefault
                        style={{ padding: "11px 29px", margin: "20px 0 0 0" }}
                        children={"Отписаться"}
                        name={"editUser"}
                        type={"button"}
                        active={false}
                    />
                )}

                {!is_follow && !is_self && (
                    <ButtonDefault
                        style={{ padding: "11px 29px", margin: "20px 0 0 0" }}
                        children={"Подписаться"}
                        name={"editUser"}
                        type={"button"}
                        active={true}
                    />
                )}

                {is_self && (
                    <ButtonDefault
                        style={{ padding: "11px 29px", margin: "20px 0 0 0" }}
                        children={"Редактировать профиль"}
                        onClick={toRouteSetting}
                        name={"editUser"}
                        type={"button"}
                        active={false}
                    />
                )}
            </div>
        </section>
    );
};

export default ProfileInfo;

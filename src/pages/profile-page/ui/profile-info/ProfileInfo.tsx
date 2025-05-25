import React from "react";
import styles from "./ProfileInfo.module.scss"
import {useRouter} from "next/navigation";
import AvatarDefault from "@/assets/img/avatar.jpg";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";
import UserStore from "@entities/user/model/store/UserStore";
import {observer} from "mobx-react-lite";
import SubscriptionStore from "@entities/subscription/model/store/SubscriptionStore";

interface iProfileInfo {
    user_id: string,
    avatar: string,
    full_name: string,
    subscriber_count: number,
    subscriptions_count: number,
    about: string,
    is_self: boolean,
    is_follow?: boolean
}

const ProfileInfo: React.FC<iProfileInfo> = observer((
    {
        user_id,
        avatar,
        full_name,
        subscriber_count,
        subscriptions_count,
        about,
        is_self,
        is_follow}
) => {
    const router = useRouter();

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
                    <p className={styles['user-info__subs-count']}>{subscriber_count} подписок</p>
                    <p className={styles['user-info__subs-count']}>{subscriptions_count} подписчиков</p>
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
                        style={{
                            padding: "11px 29px",
                            margin: "20px 0 0 0",
                            width: "100%",
                            maxWidth: "235px"
                        }}
                        onClick={e => SubscriptionStore.subscribe(user_id)}
                        children={"Отписаться"}
                        name={"editUser"}
                        type={"button"}
                        active={false}
                    />
                )}

                {!is_follow && !is_self && (
                    <ButtonDefault
                        style={{
                            padding: "11px 29px",
                            margin: "20px 0 0 0",
                            width: "100%",
                            maxWidth: "235px"
                        }}
                        onClick={e => SubscriptionStore.subscribe(user_id)}
                        children={"Подписаться"}
                        name={"editUser"}
                        type={"button"}
                        active={true}
                    />
                )}

                {is_self && (
                    <ButtonDefault
                        style={{
                            padding: "11px 29px",
                            margin: "20px 0 0 0",
                            width: "100%",
                            maxWidth: "235px"
                        }}
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
});

export default ProfileInfo;

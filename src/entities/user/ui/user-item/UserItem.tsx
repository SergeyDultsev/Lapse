'use client'

import React from "react";
import styles from "./UserItem.module.scss"
import iUser from "@/entities/user/model/types/iUser";
import AvatarDefault from "@assets/img/avatar.jpg";
import userStore from "@entities/user/model/store/UserStore";
import {useRouter} from "next/navigation";
import ButtonDefault from "@shared/ui/button/ButtonDefault";
import UserRemove from "@assets/icon/UserRemove";
import UserAdd from "@assets/icon/UserAdd";
import {observer} from "mobx-react-lite";

interface iUserProps{
    user: iUser;
}

const UserItem: React.FC<iUserProps> = observer(({ user }) => {
    const router = useRouter();
    const userAuthorized: iUser | null = userStore.userAuthorized;

    const toRouteUserPage = (user_id: string) => {
        userAuthorized?.user_id !== user_id ? router.push(`/user/${user_id}`) : router.push('/user/profile');
    }

    return (
        <article className={styles["user-item"]}>
            <div className={styles["user-item__info"]} onClick={e => toRouteUserPage(user.user_id)}>
                {user.avatar_url ? (
                    <img className={styles["user-item__info__avatar"]}
                         src={user.avatar_url}
                         alt="avatar"
                         loading="lazy"
                    />
                ) : (
                    <img className={styles['user-item__info__avatar']}
                         src={AvatarDefault.src}
                         alt="avatar"
                         loading="lazy"
                    />
                )}
                <h2 className={styles["user-item__info__username"]}>{user.full_name}</h2>
            </div>
            {user.is_follow ? (
                <ButtonDefault
                    style={{
                        width: '36px',
                        height: '36px',
                        padding: '8px',
                    }}
                    onClick={e => subscribeToUserHandle()}
                    type={"button"}
                    active={true}
                >
                    <UserRemove/>
                </ButtonDefault>
            ) : (
                <ButtonDefault
                    style={{
                        width: '36px',
                        height: '36px',
                        padding: '8px',
                    }}
                    onClick={e => subscribeToUserHandle()}
                    type={"button"}
                    active={false}
                >
                    <UserAdd/>
                </ButtonDefault>
            )}
        </article>
    )
});

export default UserItem;
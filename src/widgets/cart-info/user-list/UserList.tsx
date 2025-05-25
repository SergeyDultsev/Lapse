'use client'

import React from "react";
import {observer} from "mobx-react-lite";
import styles from "./UserList.module.scss";
import UserItem from "@/entities/user/ui/user-item/UserItem";
import iUser from "@/entities/user/model/types/iUser"

interface iUserProps{
    users: iUser[];
}

const UserList: React.FC<iUserProps> = observer(({users}) => {
    return (
        <section className={styles["user-list"]}>
            {users.map((user: iUser ) =>
                <UserItem user={user} key={user.user_id}/>
            )}
        </section>
    )
});

export default UserList;
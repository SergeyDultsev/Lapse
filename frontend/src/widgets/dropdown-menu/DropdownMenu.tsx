'use client'

import React, {ReactNode} from "react";
import styles from "./DropdownMenu.module.scss";
import classNames from "classnames";
import MenuItems from "@widgets/header-app/model/menuItems";

interface IDropdownMenuProps {
    className: string,
    visible: boolean,
    menu: [
        name: string,
        icon?: ReactNode
    ]
}

const DropdownMenu: React.FC<IDropdownMenuProps> = ({className, visible, menu }) => {
    return (
        <section className={classNames(`${visible ? styles['dropdown-menu__active'] : styles['dropdown-menu']}`, className)}>
            <>
                {menu.map(({name, icon}) => (
                    <div>{icon} {name}</div>
                ))}
            </>
        </section>
    );
};

export default DropdownMenu;
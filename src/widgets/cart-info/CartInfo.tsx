import React from "react";
import styles from  "./CartInfo.module.scss";

interface ICartInfo {
    nameCart: string,
    children: React.ReactNode;
}

const CartInfo: React.FC<ICartInfo> = ({nameCart, children}) => {
    return (
        <section className={styles["cart-info"]}>
            <div className={styles["cart-info__header"]}>
                <h2 className={styles["cart-info__title"]}>{nameCart}</h2>
            </div>
            {children}
        </section>
    );
}

export default CartInfo;
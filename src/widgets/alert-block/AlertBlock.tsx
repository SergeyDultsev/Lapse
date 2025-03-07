import React from "react";
import styles from "./AlertBlock.module.scss"

interface iAlertBlock {
    alertTitle: string | null;
    alertDescr: string | null;
}

const AlertBlock: React.FC<iAlertBlock> = ({alertTitle, alertDescr}) => {
    return (
        <section className={styles["alert-block"]}>
            {alertTitle && 
                <h2 className={styles["alert-block__title"]}>{alertTitle}</h2>
            }
            {alertDescr && 
                <p className={styles["alert-block__descr"]}>{alertDescr}</p>
            }
        </section>
    );
}

export default AlertBlock;
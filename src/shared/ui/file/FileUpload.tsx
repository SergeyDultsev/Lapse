import React from "react";
import styles from "./FileUpload.module.scss"

interface FileDefault{
    placeholder: string;
}

const FileDefault: React.FC<FileDefault> = ({placeholder}) => {
    return (
        <label className={styles['file-upload']}>
            <input type="file" />
            {placeholder}
        </label>
    )
}

export default FileDefault;
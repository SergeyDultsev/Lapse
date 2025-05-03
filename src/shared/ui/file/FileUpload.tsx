import React from "react";
import styles from "./FileUpload.module.scss";

interface FileDefaultProps {
    placeholder: string;
    onChange?: (file: File | null) => void;
}

const FileUpload: React.FC<FileDefaultProps> = ({ placeholder, onChange }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onChange?.(file);
    };

    return (
        <label className={styles['file-upload']}>
            <input type="file" onChange={handleFileChange} />
            {placeholder}
        </label>
    );
};

export default FileUpload;
'use client';

import React from 'react';
import styles from './InputBase.module.scss';
import classNames from 'classnames';

interface IInputBase {
    placeholder: string
    typeInput?: 'base' | 'auth' | 'search'
    type: string
    className?: string
    required?: boolean
    name?: string
    onChange?: (name: string, value: string | number) => void
}

const InputBase: React.FC<IInputBase> = (
    {
        placeholder,
        typeInput,
        type,
        className,
        required,
        name,
        onChange,
    }
) => {
    return (
        <input
            className={classNames(
                styles['input-base'],
                styles[`input-base__${typeInput}`],
                className
            )}
            type={type}
            placeholder={placeholder}
            required={required}
            onChange={(e) =>onChange && onChange(name || e.target.value, e.target.value)}
        />
    );
};

export default InputBase;
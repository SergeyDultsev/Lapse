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
    value?: string | number
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
        value,
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
            value={value}
            onChange={(e) =>onChange && onChange(name || e.target.value, e.target.value)}
        />
    );
};

export default InputBase;
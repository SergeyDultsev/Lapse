'use client';

import React from 'react';
import styles from './InputBase.module.scss';
import classNames from 'classnames';

interface IInputBase {
    className: string,
    typeInput?: 'base' | 'auth' | 'search',
    type: string
    placeholder: string
}

const InputBase: React.FC<IInputBase> = (
    { placeholder, type, className }
) => {
    return (
        <input
            className={classNames(styles['input-base'], className)}
            type={type}
            placeholder={placeholder}
        />
    );
};

export default InputBase;
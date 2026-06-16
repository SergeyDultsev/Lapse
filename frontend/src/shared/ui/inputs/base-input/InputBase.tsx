'use client';

import React from 'react';
import styles from './BaseInput.module.scss';
import classNames from 'classnames';

interface IBaseInput {
    className: string,
    typeInput?: 'base' | 'auth' | 'search',
    type: string
    placeholder: string
}

const InputBase: React.FC<IBaseInput> = (
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
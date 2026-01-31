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

const BaseInput: React.FC<IBaseInput> = (
    { placeholder, type, className }
) => {
    return (
        <input
            className={classNames(styles['base-input'], className)}
            type={type}
            placeholder={placeholder}
        />
    );
};

export default BaseInput;
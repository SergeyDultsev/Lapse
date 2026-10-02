'use client';

import React from 'react';
import styles from './UIInput.module.scss';
import classNames from 'classnames';
import { IInputBase } from '@shared/ui/ui-input/types/types';

const UIInput: React.FC<IInputBase> = (
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
    switch (type) {
        case 'password':
        case 'search':
        case 'text':
        case 'email':
        case 'url':
        default:
            return (
                <label>
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
                        onChange={(e) => onChange && onChange(name || e.target.value, e.target.value)}
                    />
                </label>
            );
    }
};

export default UIInput;
'use client';

import React from 'react';
import styles from './InputSearch.module.scss';
import classNames from 'classnames';
import { IInputBase } from '@shared/ui/input/types/types';

const InputSearch: React.FC<IInputBase> = (
    {
        placeholder,
        typeInput,
        className,
        required,
        name,
        value,
        onChange,
    }
) => {
    return (
        <label>
            <input
                className={classNames(
                    styles['input-base'],
                    styles[`input-base__${typeInput}`],
                    className
                )}
                type={'search'}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={(e) => onChange && onChange(name || e.target.value, e.target.value)}
            />
        </label>
    );
};

export default InputSearch;
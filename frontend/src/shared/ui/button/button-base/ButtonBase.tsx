'use client';

import React from 'react';
import styles from './ButtonBase.module.scss';
import classNames from 'classnames';
import { tButtonVariant, tButtonType, tButtonSize } from '../config/types';

export interface ButtonProps  {
    children: React.ReactNode;
    size?: tButtonSize;
    variant?: tButtonVariant;
    className?: string;
    onClick?: () => void;
    type?: tButtonType;
}

const ButtonBase: React.FC<ButtonProps > = (
    { 
        children, 
        className, 
        size, 
        variant, 
        onClick, 
        type = 'button', 
    }) => {

    return (
        <button
            className={classNames(
                styles['button-base'],
                styles[`button-base__${size}`],
                styles[`button-base__${variant}`],
                className
            )}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );

};

export default ButtonBase;
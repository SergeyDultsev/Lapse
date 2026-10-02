'use client';

import React from 'react';
import styles from './UIButton.module.scss';
import classNames from 'classnames';

export type tButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';
export type tButtonType = 'button' | 'submit' | 'reset';
export type tButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps  {
    children: React.ReactNode;
    size?: tButtonSize;
    variant?: tButtonVariant;
    className?: string;
    onClick?: () => void;
    type?: tButtonType;
}

export const UIButton: React.FC<ButtonProps > = (
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
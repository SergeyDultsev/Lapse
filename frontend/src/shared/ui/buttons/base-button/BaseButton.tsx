'use client';

import React from 'react';
import styles from './BaseButton.module.scss';
import classNames from 'classnames';

interface ButtonProps  {
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    className?: string;
    onClick?: () => void;
}

const BaseButton: React.FC<ButtonProps > = (
    { children, className, size, variant, onClick }) => {

    return (
        <button
            className={classNames(
                styles['base-button'],
                styles[`base-button--${size}`],
                styles[`base-button--${variant}`],
                className
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );

};

export default BaseButton;
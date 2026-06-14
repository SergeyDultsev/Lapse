'use client';

import React from 'react';
import styles from './ButtonBase.module.scss';
import classNames from 'classnames';

interface ButtonProps  {
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
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
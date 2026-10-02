'use client';

import styles from './UIDrop.module.scss';
import { useEffect, useRef } from 'react';
import { INavbarItem } from '@shared/ui/ui-nav-item/ui/UINavItem';
import { usePathname } from 'next/navigation';
import { useOutsideClick } from '@shared/utils/useOutsideClick';
import UINavItem from '@shared/ui/ui-nav-item/ui/UINavItem';

interface IDropMenuProps {
    navItems: INavbarItem[];
    isVisible?: boolean;
    onClose?: () => void;
    top?: number,
    right?: number,
}

export const UIDrop: React.FC<IDropMenuProps> = (
    {
        navItems,
        isVisible,
        onClose,
        top,
        right,
    }
) => {
    const pathname =  usePathname();
    const prevPathname = useRef(pathname);
    const ref = useOutsideClick<HTMLDivElement>(() => onClose?.());

    useEffect(() => {
        if (!isVisible) return;
        const onKey = (e: KeyboardEvent) => e.key ==='Escape' && onClose?.();
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isVisible, onClose]);

    useEffect(() => {
        if (prevPathname.current !== pathname) {
            onClose?.();
            prevPathname.current = pathname;
        }
    }, [pathname, onClose]);

    return (
        <div
            ref={ref}
            style={{ top: `${top}px`, right: `${right}px` }}
            className={`${isVisible ? styles['drop-menu'] : styles['drop-menu__invisible']}`}
        >
            <div className={styles['drop-menu__nav']}>
                {navItems
                    .map((item) => (
                        <UINavItem key={item.name} {...item} />
                    ))}
            </div>
        </div>
    );
};
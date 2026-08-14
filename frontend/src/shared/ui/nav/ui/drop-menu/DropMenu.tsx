import styles from './DropMenu.module.scss';
import { NavItem } from '@/shared';
import { INavbarItem } from '@shared/ui/nav/model/INavItem';
import { useOutsideClick } from '@/shared';
import { useEffect } from 'react';

interface IDropMenuProps {
    navItems: INavbarItem[];
    isVisible?: boolean;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    onClose?: () => void;
    top?: number,
    right?: number,
}

const DropMenu: React.FC<IDropMenuProps> = (
    {
        navItems,
        isVisible,
        header,
        footer,
        onClose,
        top,
        right,
    }
) => {
    
    const ref = useOutsideClick<HTMLDivElement>(() => onClose?.());
    
    useEffect(() => {
        if (!isVisible) return;
        const onKey = (e: KeyboardEvent) => e.key ==='Escape' && onClose?.();
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isVisible, onClose]);
    
    return (
        <div
            ref={ref}
            style={{ top: `${top}px`, right: `${right}px` }}
            className={`${isVisible ? styles['drop-menu'] : styles['drop-menu__invisible']}`}
        >
            <div className={styles['drop-menu__nav']}>
                { header }

                {navItems
                    .map((item) => (
                        <NavItem key={item.name} {...item} />
                    ))}

                { footer }
            </div>
        </div>  
    );
};

export default DropMenu;
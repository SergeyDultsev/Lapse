import styles from './DropMenu.module.scss';
import { NavItem } from '@/shared';
import { INavbarItem } from '@shared/ui/nav/model/INavItem';

interface IDropMenuProps {
    navItems: INavbarItem[];
    isVisible?: boolean;
}

const DropMenu: React.FC<IDropMenuProps> = (
    {
        navItems,
        isVisible,
    }
) => {
    return (
        <div
            className={`${isVisible ? styles['drop-menu'] : styles['drop-menu__invisible']}`}
        >
            <div className={styles['drop-menu__nav']}>
                {navItems
                    .map((item) => (
                        <NavItem key={item.name} {...item} />
                    ))}
            </div>
        </div>  
    );
};

export default DropMenu;
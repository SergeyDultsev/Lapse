import styles from './DropMenu.module.scss';
import { NavItem } from '@/shared';
import { INavbarItem } from '@shared/ui/nav/model/INavItem';

interface IDropMenuProps {
    navItems: INavbarItem[];
    isVisible?: boolean;
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

const DropMenu: React.FC<IDropMenuProps> = (
    {
        navItems,
        isVisible,
        header,
        footer,
    }
) => {
    return (
        <div
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
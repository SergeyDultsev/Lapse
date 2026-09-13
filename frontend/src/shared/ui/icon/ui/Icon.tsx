import { useMemo } from 'react';
import type { FC } from 'react';
import { IconProps } from '@shared/ui/icon/types/types';

import AddIcon from '@assets/icons/AddIcon';
import AnalyticsIcon from '@assets/icons/AnalyticsIcon';
import CommentIcon from '@assets/icons/CommentIcon';
import DarkModeIcon from '@assets/icons/DarkModeIcon';
import ExitIcon from '@assets/icons/ExitIcon';
import ExploreIcon from '@assets/icons/ExploreIcon';
import EyeIcon from '@assets/icons/EyeIcon';
import FavoriteIcon from '@assets/icons/FavoriteIcon';
import HistoryIcon from '@assets/icons/HistoryIcon';
import HomeIcon from '@assets/icons/HomeIcon';
import MenuIcon from '@assets/icons/MenuIcon';
import NotificationIcon from '@assets/icons/NotificationIcon';
import ProfileIcon from '@assets/icons/ProfileIcon';
import SaveIcon from '@assets/icons/SaveIcon';
import SearchIcon from '@assets/icons/SearchIcon';
import SettingsIcon from '@assets/icons/SettingsIcon';
import TagIcon from '@assets/icons/TagIcon';
import ThemeIcon from '@assets/icons/ThemeIcon';
import UserAdd from '@assets/icons/UserAdd';
import UserRemove from '@assets/icons/UserRemove';
import WriteIcon from '@assets/icons/WriteIcon';

const icons = {
    Add: AddIcon,
    Analytics: AnalyticsIcon,
    Comment: CommentIcon,
    DarkMode: DarkModeIcon,
    Exit: ExitIcon,
    Explore: ExploreIcon,
    Eye: EyeIcon,
    Favorite: FavoriteIcon,
    History: HistoryIcon,
    Home: HomeIcon,
    Menu: MenuIcon,
    Notification: NotificationIcon,
    Profile: ProfileIcon,
    Save: SaveIcon,
    Search: SearchIcon,
    Settings: SettingsIcon,
    Tag: TagIcon,
    Theme: ThemeIcon,
    UserAdd,
    UserRemove,
    Write: WriteIcon,
} as const;

export type IconName = keyof typeof icons;

const Icon: FC<IconProps> = ({ name, size, color }) => {
    const IconComponent = useMemo(() => icons[name] ?? null, [name]);

    if (!IconComponent) return null;

    return (
        <span style={{ width: size, height: size, color, display: 'inline-block' }}>
            <IconComponent />
        </span>
    );
};

export default Icon;

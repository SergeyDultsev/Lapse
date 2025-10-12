import INavLinks from './types';
import HomeIcon from "@/assets/icon/HomeIcon";
import ProfileIcon from "@/assets/icon/ProfileIcon";
import SettingsIcon from "@assets/icon/SettingsIcon";
import TagsIcon from "@assets/icon/TagsIcon";
import NotificationIcon from "@assets/icon/NotificationIcon";
import ExitIcon from "@assets/icon/ExitIcon";
import SearchIcon from "@assets/icon/SearchIcon";
import HistoryIcon from "@assets/icon/HistoryIcon";


const navLinkGroups: { title?: string; links: INavLinks[] }[] = [
    {
        links: [
            {
                name: "Главная",
                icon: <HomeIcon />,
                url: "/"
            },
            {
                name: "Профиль",
                icon: <ProfileIcon />,
                url: "/profile"
            },
            {
                name: "Поиск",
                icon: <SearchIcon />,
                url: "/search"
            },
        ],
    },
    {
        links: [
            {
                name: "Уведомления",
                icon: <NotificationIcon />,
                url: "/notifications"
            },
            {
                name: "Истории",
                icon: <HistoryIcon />,
                url: "/history"
            },
            {
                name: "Теги",
                icon: <TagsIcon />,
                url: "/tags"
            },
        ],
    },
    {
        links: [
            {
                name: "Настройки",
                icon: <SettingsIcon />,
                url: "/settings"
            },
            {
                name: "Выход",
                icon: <ExitIcon />,
                url: "/logout",
                isLogout: true
            },
        ],
    },
];

export default navLinkGroups;
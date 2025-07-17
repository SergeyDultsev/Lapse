import INavLinks from './types';
import HomeIcon from "@/assets/icon/HomeIcon";
import ProfileIcon from "@/assets/icon/ProfileIcon";
import SettingsIcon from "@assets/icon/SettingsIcon";
import ExitIcon from "@assets/icon/ExitIcon";
import WriteIcon from "@assets/icon/WriteIcon";
import AnalyticsIcon from "@assets/icon/AnalyticsIcon";
import TagsIcon from "@assets/icon/TagsIcon";
import HistoryIcon from "@assets/icon/HistoryIcon";


const navLinks: INavLinks[] = [
    {
        name: "Главная",
        icon: <HomeIcon />,
        url: "/",
    },
    {
        name: "Профиль",
        icon: <ProfileIcon />,
        url: "/profile",
    },
    {
        name: "Теги",
        icon: <TagsIcon />,
        url: "/tags",
    },
    {
        name: "Аналитика",
        icon: <AnalyticsIcon />,
        url: "/analytics",
    },
    {
        name: "Написать пост",
        icon: <WriteIcon />,
        url: "/create-post",
    },
    {
        name: "История",
        icon: <HistoryIcon />,
        url: "/history",
    },
    {
        name: "Настройки",
        icon: <SettingsIcon />,
        url: "/settings",
    },
    {
        name: "Выход",
        icon: <ExitIcon />,
        url: "/exit",
    },
]

export default navLinks;
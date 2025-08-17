import INavLinks from './types';
import HomeIcon from "@/assets/icon/HomeIcon";
import ProfileIcon from "@/assets/icon/ProfileIcon";
import AnalyticsIcon from "@assets/icon/AnalyticsIcon";
import TagsIcon from "@assets/icon/TagsIcon";
import NotificationIcon from "@assets/icon/NotificationIcon";


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
        name: "Уведомления",
        icon: <NotificationIcon />,
        url: "/notifications",
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
]

export default navLinks;
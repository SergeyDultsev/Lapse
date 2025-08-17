import IMenuItem from './types';
import ProfileIcon from "@/assets/icon/ProfileIcon";
import SettingsIcon from "@assets/icon/SettingsIcon";
import DarkIcon from "next/dist/client/components/react-dev-overlay/ui/icons/dark-icon";
import ExitIcon from "@assets/icon/ExitIcon";


const menuItems: IMenuItem[] = [
    {
        name: "Темный режим",
        icon: <DarkIcon />,
    },
    {
        name: "Справка",
        icon: <ProfileIcon />,
    },
    {
        name: "Настройки",
        icon: <SettingsIcon />,
    },
    {
        name: "Выход",
        icon: <ExitIcon />,
    },
]

export default menuItems;
import { useThemeStore } from "@features";
import styles from './SwitcherTheme.module.scss'
import ThemeIcon from "@assets/icon/ThemeIcon";

const SwitcherTheme: React.FC = () => {
    const toggle = useThemeStore((s) => s.toggleTheme);

    return (
        <button className={styles['switcher-theme']} onClick={toggle}>
            <ThemeIcon />
        </button>
    );
}

export default SwitcherTheme;

import type { Metadata } from 'next';
import SettingsPage from '@pages/settings-page/SettingsPage';

export const metadata: Metadata = {
    title: 'Настройки',
};

export default function Settings() {
    return (
        <SettingsPage />
    );
}

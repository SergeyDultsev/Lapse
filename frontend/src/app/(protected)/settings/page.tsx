import type { Metadata } from 'next';
import React from 'react';
import SettingsContent from '@app/(protected)/settings/SettingsContent';

export const metadata: Metadata = {
    title: 'Настройки',
};

export default function SettingsPage() {
    return <SettingsContent />;
}

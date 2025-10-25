import type { ITheme } from "@shared/types/ITheme";

export function initTheme() {
    const saved = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    let theme: ITheme;

    if (saved === 'light' || saved === 'dark') {
        theme = saved;
    } else {
        theme = systemTheme;
    }

    document.documentElement.setAttribute('data-theme', theme);
}
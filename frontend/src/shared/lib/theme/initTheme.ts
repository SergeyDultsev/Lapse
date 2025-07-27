import { Theme } from "@shared";

export function initTheme() {
    const saved = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    let theme: Theme;

    if (saved === 'light' || saved === 'dark') {
        theme = saved;
    } else {
        theme = systemTheme;
    }

    document.documentElement.setAttribute('data-theme', theme);
}
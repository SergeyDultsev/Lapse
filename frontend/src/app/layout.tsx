import type { Metadata } from 'next';
import Script from 'next/script';
import { Manrope as FontManrope } from 'next/font/google';
import '@assets/css/global.scss';

export const metadata: Metadata = {
    title: 'Lapse',
    description: 'Платформа блог',
};

const manrope = FontManrope({
    weight: ['400', '600', '700'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
        lang="ru"
        className={manrope.className}
        suppressHydrationWarning
    >
        <head>
            <Script id="theme-init" strategy="beforeInteractive">
                {
                    `
                        (function() {
                          try {
                            const themeStorage = 'theme-storage';
                            const stored = localStorage.getItem(themeStorage);
                            const parsed = stored ? JSON.parse(stored) : null;
                            const theme = parsed?.state?.theme ?? 'system';
                            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                            const resolvedTheme = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;
                            document.documentElement.setAttribute('data-theme', resolvedTheme);
                          } catch(e) {}
                        })();
                    `
                }
            </Script>
        </head>
        <body>
            {children}
        </body>
    </html>
  );
}

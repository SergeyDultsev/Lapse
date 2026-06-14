import type { Metadata } from 'next';
import { Manrope as FontManrope } from 'next/font/google';
import '@assets/css/global.scss';
import AppProviders from '@providers/app-providers/ui/AppProvider';

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
    >
        <body>
            <AppProviders>
                {children}
            </AppProviders>
        </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Manrope as FontManrope } from 'next/font/google';
import '@assets/css/global.scss';

export const metadata: Metadata = {
  title: 'Dultsev',
  description: 'Платформа блог',
};

const manrope = FontManrope({
  weight: ['400', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.className}>
        <body>
            {children}
        </body>
    </html>
  );
}

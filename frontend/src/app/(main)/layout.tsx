import type { Metadata } from "next";
import { Manrope as FontManrope } from "next/font/google";
import "@/assets/css/global.scss";
import { NavBar, HeaderApp } from "@widgets";
import { ReactQueryProvider } from '@/shared';
import { ThemeProvider } from "@providers";

export const metadata: Metadata = {
  title: "Dultsev",
  description: "Платформа подписок на авторский контент",
};

const Manrope = FontManrope({
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
    <html lang="en">
      <body className={Manrope.className}>
          <ReactQueryProvider>
              <ThemeProvider>
                  <section className="container">
                      <HeaderApp/>
                      <NavBar/>
                      {children}
                  </section>
              </ThemeProvider>
          </ReactQueryProvider>
      </body>
    </html>
  );
}

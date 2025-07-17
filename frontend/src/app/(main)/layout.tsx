import type { Metadata } from "next";
import { Manrope as FontManrope } from "next/font/google";
import "@/assets/css/global.scss";
import { NavBar, HeaderApp } from "@widgets";

export const metadata: Metadata = {
  title: "DiplomaFrontend",
  description: "Дипломный проект",
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
        <section className="container">
            <HeaderApp/>
            <NavBar/>
            {children}
        </section>
      </body>
    </html>
  );
}

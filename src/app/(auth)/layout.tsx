import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "@/assets/css/global.scss";

const JetBrainsMono = JetBrains_Mono({
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Авторизация",
  description: "Страница входа",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={JetBrainsMono.className}>
        <section className="container-auth">
          {children}
        </section>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { RecoilRootWrapper } from "./components/RecoilRootWrapper";
import { SideDrawer } from "./components/SideDrawer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "flully | 散歩記録型まいごペット捜索支援",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RecoilRootWrapper>
          <SideDrawer>
            <Header />
            <div className="px-5 pt-28 py-16 w-screen">{children}</div>
            <Navigation />
          </SideDrawer>
        </RecoilRootWrapper>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { RecoilRootWrapper } from "./components/RecoilRootWrapper";
import { SideDrawer } from "./components/SideDrawer";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import { BaseWrapper } from "./components/BaseWrapper";

export const font = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "flully | ふらりと出会った動物をシェアできるコミュニティ",
  description: `ふらりは、街や自然で出会った動物をシェアできるコミュニティサービスです。
  近所で見つけた鳥や猫、犬などを投稿して、他の動物好きなユーザーとシェアしましょう。
  さらに、迷子のペットや保護したペットの情報を共有することもできます。
  迷子のペットと飼い主がいち早く再開できるようにサポートします。`,
  openGraph: {
    title: "flully | ふらりと出会った動物をシェアできるコミュニティ",
    description: `ふらりは、街や自然で出会った動物をシェアできるコミュニティサービスです。
  近所で見つけた鳥や猫、犬などを投稿して、他の動物好きなユーザーとシェアしましょう。
  さらに、迷子のペットや保護したペットの情報を共有することもできます。
  迷子のペットと飼い主がいち早く再開できるようにサポートします。`,
    url: "https://flully.jp",
    siteName: "flully | ふらりと出会った動物をシェアできるコミュニティ",
    images: "./opengraph-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "flully | ふらりと出会った動物をシェアできるコミュニティ",
    description: `ふらりは、街や自然で出会った動物をシェアできるコミュニティサービスです。
  近所で見つけた鳥や猫、犬などを投稿して、他の動物好きなユーザーとシェアしましょう。
  さらに、迷子のペットや保護したペットの情報を共有することもできます。
  迷子のペットと飼い主がいち早く再開できるようにサポートします。`,
    images: "https://flully.jp/images/opengraph-image.png",
  },
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
      <body className={`${font.className} antialiased`}>
        <RecoilRootWrapper>
          <SideDrawer>
            <Header />
            <BaseWrapper>{children}</BaseWrapper>
            <Navigation />
          </SideDrawer>
        </RecoilRootWrapper>
      </body>
    </html>
  );
}

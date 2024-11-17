"use client";
import { useRouter } from "next/navigation";
import app_qr from "/public/images/app_qr.png";
import bg_image from "/public/images/bg_top.jpg";
import dev_icon from "/public/images/developer_icon.jpg";
import Image from "next/image";
import MailIcon from "@mui/icons-material/Mail";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Home() {
  const router = useRouter();
  const handleStarted = () => {
    router.push("/map");
  };

  return (
    <main className="min-h-screen bg-main bg-opacity-75 relative overflow-hidden">
      <Image
        src={bg_image}
        alt="background"
        className="object-cover -z-10 blur"
        fill
      />
      <div className="py-20 max-w-7xl mx-auto">
        <div className="rounded-lg lg:p-10 p-5 m-2">
          <div className="w-full border-b border-main p-2">
            <h1 className="text-white text-4xl font-bold">flully</h1>
          </div>
          <div className="max-w-xl mx-auto lg:flex items-center justify-center p-10">
            <button
              className="bg-main bg-opacity-75 text-white rounded-lg p-2 active:scale-95 transition-all"
              onClick={handleStarted}
            >
              <span className="text-xl font-bold min-h-16">
                flullyをはじめる
              </span>
            </button>
          </div>
          <section>
            <div className="bg-main bg-opacity-10 p-4 rounded overflow-hidden relative">
              <div className="absolute top-0 left-0 bg-main h-full w-2" />
              <p className="font-bold text-xl">このアプリでできること</p>
            </div>
            <div className="lg:flex items-center justify-center divide-x divide-gray-200">
              <div className="w-full p-2 m-1">
                <p className="font-bold">❶ みつけた動物をシェア</p>
                <p className="text-sm"></p>
              </div>
              <div className="w-full p-2 m-1">
                <p className="font-bold">❷ 迷子・保護情報の掲載</p>
              </div>
              <div className="w-full p-2 m-1">
                <p className="font-bold">❸ 散歩情報の記録</p>
              </div>
            </div>
          </section>
        </div>
        <footer className="bg-white bg-opacity-20 rounded-xl px-10 py-5 m-2 divide-y divide-gray-300">
          <div className="lg:flex items-center justify-between pb-2">
            <div className="lg:flex items-center">
              <button className="p-4">
                <p className="font-bold flex items-center">
                  <span
                    className="material-icons mr-0.5"
                    style={{ fontSize: "16px" }}
                  >
                    description
                  </span>
                  ご利用規約
                </p>
              </button>
              <button className="p-4">
                <p className="font-bold flex items-center">
                  <span
                    className="material-icons mr-0.5"
                    style={{ fontSize: "16px" }}
                  >
                    verified_user
                  </span>
                  プライバシーポリシー
                </p>
              </button>
              <button className="p-4">
                <p className="font-bold flex items-center">
                  <span
                    className="material-icons mr-0.5"
                    style={{ fontSize: "16px" }}
                  >
                    mail
                  </span>
                  お問い合わせ
                </p>
              </button>
            </div>
            <p className="p-4 text-sm">
              ©️ 2024 flully.jp - All rights reserved.
            </p>
          </div>
          <div className="lg:flex items-center justify-between p-2">
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 overflow-hidden rounded-full relative">
                <Image
                  src={dev_icon}
                  alt="dev_icon"
                  className="object-cover"
                  fill
                />
              </div>
              <div className="p-2">
                <p className="text-xs font-bold text-gray-500">Developed by</p>
                <p className="text-xl font-bold">Sho HORIGUCHI</p>
              </div>
            </div>
            <div className="p-2">
              <div className="flex items-center justify-center">
                <button className="p-2">
                  <MailIcon style={{ fontSize: "28px" }} />
                </button>
                <a
                  href="https://x.com/mogu_57B"
                  target="_blank"
                  className="p-2"
                >
                  <XIcon style={{ fontSize: "28px" }} />
                </a>
                <a
                  href="https://github.com/moguDev"
                  target="_blank"
                  className="p-2"
                >
                  <GitHubIcon style={{ fontSize: "28px" }} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

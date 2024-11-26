"use client";
import { useRouter } from "next/navigation";
import app_qr from "/public/images/app_qr.png";
import bg_image from "/public/images/bg_top.jpg";
import dev_icon from "/public/images/developer_icon.jpg";
import Image from "next/image";
import MailIcon from "@mui/icons-material/Mail";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";
import logo from "/public/images/flully_logo.png";
import screenshot from "/public/images/top_screenshot.png";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const handleStarted = () => {
    router.push("/map");
  };

  return (
    <main className="min-h-screen bg-main bg-opacity-50 relative overflow-hidden">
      <Image
        src={bg_image}
        alt="background"
        className="object-cover -z-10 blur-md"
        fill
      />
      <div className="lg:pt-32 pt-20 space-y-5">
        <div className="max-w-7xl mx-auto pb-20">
          <section className="px-3">
            <div className="lg:flex w-full">
              <div className="flex flex-col items-center w-full">
                <div className="lg:h-96 h-40 w-full overflow-hidden relative lg:mt-0 mt-10">
                  <Image
                    src={logo}
                    alt="logo"
                    className="object-contain select-none"
                    fill
                  />
                </div>
                <div className="relative flex items-center justify-center p-2 lg:mb-8 mb-3">
                  <div className="absolute bg-main bg-opacity-70 h-full w-full -z-10 blur-md" />
                  <p className="text-white font-black lg:text-[28px] text-xs select-none">
                    ふらりと出会った動物をシェアできるコミュニティ
                  </p>
                </div>
                <div className="text-white lg:text-base text-xs relative mx-5">
                  <div className="absolute bg-main h-full w-full -z-10 bg-opacity-30 blur-xl" />
                  <div className="mx-5 p-2 border-t border-b border-white border-opacity-50 select-none">
                    <section className="pb-2">
                      <p>
                        <span className="font-black">ふらり</span>
                        は、街や自然で出会った動物をシェアできるコミュニティサービスです。
                      </p>
                      <p>
                        近所で見つけた鳥や猫、犬などを投稿して、他の動物好きなユーザーとシェアしましょう。
                      </p>
                    </section>
                    <section>
                      <p>
                        さらに、迷子のペットや保護したペットの情報を共有することもできます。
                      </p>
                      <p>
                        迷子のペットと飼い主がいち早く再開できるようにサポートします。
                      </p>
                    </section>
                  </div>
                  <div className="w-full grid lg:grid-cols-2 gap-2 p-5 relative">
                    <div className="flex flex-col items-center justify-center space-y-2 h-full w-full">
                      <button
                        className="relative w-full h-1/2 bg-main bg-opacity-80 text-white rounded-lg px-10 py-5 active:scale-95 transition-all duration-700 hover:shadow-xl"
                        onClick={handleStarted}
                      >
                        <p className="lg:text-xl text-base font-black text-center">
                          ふらりと見てみる
                        </p>
                      </button>
                      <button
                        className="w-full h-1/2 border border-opacity-50 border-white bg-opacity-80 text-white rounded-lg px-10 py-5 active:scale-95 transition-all flex items-center justify-center"
                        onClick={() => router.push("/signin")}
                      >
                        <span className="material-icons mr-1">login</span>
                        <p className="lg:text-xl text-base font-black text-center">
                          ログイン
                        </p>
                      </button>
                    </div>
                    <div className="lg:flex flex-col items-center justify-center bg-base rounded-lg h-full min-w-52 p-3 hidden">
                      <p className="text-black font-black w-fit">
                        スマホでふらり
                      </p>
                      <Image
                        src={app_qr}
                        alt="app_qr"
                        className="h-24 w-24 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-10 lg:block hidden rotate-3">
                <div className="mockup-phone min-w-[352px] shadow-xl">
                  <div className="camera"></div>
                  <div className="display">
                    <div className="h-[701px] w-full overflow-hidden relative">
                      <Image
                        src={screenshot}
                        alt="screenshot"
                        className="object-contain shadow-xl"
                        fill
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <section className="bg-white bg-opacity-50 backdrop-blur p-10 rounded-xl">
            <div className="p-4 rounded overflow-hidden relative">
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
          </section> */}
        </div>
        <footer className="bg-main bg-opacity-30 backdrop-blur-lg text-base p-5">
          <div className="max-w-7xl mx-auto px-3 divide-y divide-gray-300">
            <div className="lg:flex items-center justify-between pb-2">
              <div className="lg:flex items-center">
                <Link
                  href="/terms"
                  className="p-4 transition-all hover:-translate-y-1 active:scale-95"
                >
                  <p className="font-black flex items-center select-none">
                    <span
                      className="material-icons mr-0.5"
                      style={{ fontSize: "16px" }}
                    >
                      description
                    </span>
                    ご利用規約
                  </p>
                </Link>
                <Link
                  href="/privacy"
                  className="p-4 transition-all hover:-translate-y-1 active:scale-95"
                >
                  <p className="font-black flex items-center select-none">
                    <span
                      className="material-icons mr-0.5"
                      style={{ fontSize: "16px" }}
                    >
                      verified_user
                    </span>
                    プライバシーポリシー
                  </p>
                </Link>
                <a
                  href="mailto:contact@flully.jp?subject=お問い合わせ"
                  className="p-4 transition-all hover:-translate-y-1 active:scale-95"
                >
                  <p className="font-black flex items-center select-none">
                    <span
                      className="material-icons mr-0.5"
                      style={{ fontSize: "16px" }}
                    >
                      mail
                    </span>
                    お問い合わせ
                  </p>
                </a>
              </div>
              <p className="p-4 font-bold text-sm text-white text-center select-none">
                {"©️ 2024 flully.jp"}
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
                  <p className="text-xs font-bold text-opacity-80">
                    Developed by
                  </p>
                  <p className="text-xl font-black">Sho HORIGUCHI</p>
                </div>
              </div>
              <div className="p-2">
                <div className="flex items-center justify-center">
                  <a
                    href="mailto:contact@flully.jp?subject=お問い合わせ"
                    className="p-2 transition-all hover:-translate-y-1 active:scale-95"
                  >
                    <MailIcon style={{ fontSize: "28px" }} />
                  </a>
                  <a
                    href="https://x.com/mogu_57B"
                    target="_blank"
                    className="p-2 transition-all hover:-translate-y-1 active:scale-95"
                  >
                    <XIcon style={{ fontSize: "28px" }} />
                  </a>
                  <a
                    href="https://github.com/moguDev"
                    target="_blank"
                    className="p-2 transition-all hover:-translate-y-1 active:scale-95"
                  >
                    <GitHubIcon style={{ fontSize: "28px" }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

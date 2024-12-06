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
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const handleStarted = () => {
    router.push("/map");
  };

  return (
    <main className="min-h-screen bg-main bg-opacity-60 relative overflow-hidden">
      <Image
        src={bg_image}
        alt="background"
        className="object-cover -z-10 blur-md"
        fill
      />
      <div className="lg:pt-32 pt-20 space-y-5">
        <div className="max-w-7xl mx-auto pb-5">
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
                  <p className="text-white font-black lg:text-[28px] text-sm select-none">
                    ふらりと出会った動物をシェアできるコミュニティ
                  </p>
                </div>
                <div className="text-white lg:text-base text-xs relative mx-5">
                  <div className="absolute bg-main h-full w-full -z-10 bg-opacity-30 blur-xl" />
                  <div className="mx-2 p-2 border-t border-b border-white border-opacity-50 select-none font-semibold">
                    <section className="pb-2">
                      <p className="my-1">
                        <span className="font-black lg:text-[21px] text-[16px] underline">
                          ふらり
                        </span>
                        は、街や自然で出会った動物をシェアできるコミュニティサービスです。
                      </p>
                      <p className="my-1">
                        近所で見つけた鳥や猫、犬などを投稿して、他の動物好きなユーザーとシェアしましょう。
                      </p>
                    </section>
                    <section>
                      <p className="my-1">
                        迷子のペットや保護したペットの情報を共有することもできます。
                      </p>
                      <p className="my-1">
                        ふらりはすべての動物を愛する人とペットを大切に想う人を繋ぎ、ペットとの再会をサポートします。
                      </p>
                    </section>
                  </div>
                  <div className="w-full grid lg:grid-cols-4 gap-2 p-5 relative">
                    <div className="col-span-3 lex flex-col items-center justify-center h-full w-full relative">
                      <button
                        className="relative w-full h-1/2 bg-main bg-opacity-80 text-white rounded-lg px-10 py-5 active:scale-95 transition-all duration-700 hover:shadow-xl"
                        onClick={handleStarted}
                      >
                        <p className="lg:text-xl text-base font-black text-center">
                          ふらりをはじめましょう！
                        </p>
                      </button>
                      <div className="pt-2">
                        <button
                          className="w-full h-1/2 border border-opacity-50 border-white bg-opacity-80 text-white rounded-lg px-10 py-5 active:scale-95 transition-all flex items-center justify-center"
                          onClick={() => router.push("/signin")}
                        >
                          <span className="material-icons mr-1">login</span>
                          <p className="lg:text-lg text-sm font-black text-center">
                            ログインはこちら
                          </p>
                        </button>
                      </div>
                    </div>
                    <div className="lg:flex flex-col items-center justify-center backdrop-blur rounded-lg h-full min-w-52 p-1 hidden">
                      <p className="text-white font-black w-fit pb-2">
                        スマホでふらり
                      </p>
                      <Image
                        src={app_qr}
                        alt="app_qr"
                        className="h-28 w-28 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-10 lg:block hidden rotate-3">
                <div className="mockup-phone min-w-[352px] shadow-xl">
                  <div className="bg-[#000] z-20 rounded-full relative h-6 w-24 top-3 mx-auto"></div>
                  <div className="display">
                    <div className="h-[701px] w-full overflow-hidden relative">
                      <Image
                        src="/images/top_img_01.png"
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
          <section className="max-w-6xl mx-auto px-3">
            <h2 className="w-full font-bold lg:text-xl text-md text-white border-b border-white border-opacity-50 p-2 my-4">
              <span className="material-icons lg:block lg:w-fit lg:opacity-100 w-0 opacity-0">
                tips_and_updates
              </span>
              <span
                className="material-icons lg:hidden lg:w-0 lg:opacity-0"
                style={{ fontSize: "16px" }}
              >
                tips_and_updates
              </span>
              <span className="lg:text-3xl text-xl font-black">ふらり</span>
              でできること
            </h2>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
              <div className="flex flex-col items-center w-full p-4 bg-white bg-opacity-10 backdrop-blur rounded-lg">
                <h3 className="text-left text-white font-extrabold w-full flex items-center lg:text-lg select-none border-b border-white border-opacity-30 pb-3">
                  <span className="material-icons mr-1">pets</span>
                  みつけた動物をシェア
                </h3>
                <p className="mt-4 px-2 text-sm w-full text-left text-white font-semibold text-opacity-90">
                  街や自然でふと出会った動物の写真を投稿し、その瞬間を共有しましょう！他のユーザーと交流しながら、動物好きならではの感動を広げる体験を提供します。
                </p>
                <div className="mockup-phone m-0 min-w-[352px] shadow-xl scale-90">
                  <div className="bg-[#000] z-20 rounded-full relative h-6 w-24 top-3 left-0 mx-auto"></div>
                  <div className="display">
                    <div className="h-[701px] w-full overflow-hidden relative">
                      <Image
                        src="/images/top_img_03.png"
                        alt="screenshot"
                        className="object-contain shadow-xl"
                        fill
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center w-full p-4 bg-white bg-opacity-10 backdrop-blur rounded-lg">
                <h3 className="text-left text-white font-extrabold w-full flex items-center lg:text-lg select-none border-b border-white border-opacity-30 pb-3">
                  <span className="material-icons mr-1">campaign</span>
                  まいごペット情報の掲示板
                </h3>
                <p className="mt-4 px-2 text-sm w-full text-left text-white font-semibold text-opacity-90">
                  迷子になったペットの情報を投稿したり、見つけたペットの保護情報をシェアできます。飼い主や保護者とつながることで、大切な家族を再会へと導くお手伝いができます。
                </p>
                <div className="mockup-phone m-0 scale-90 min-w-[352px] shadow-xl">
                  <div className="bg-[#000] z-20 rounded-full relative h-6 w-24 top-3 left-0 mx-auto"></div>
                  <div className="display">
                    <div className="h-[701px] w-full overflow-hidden relative">
                      <Image
                        src="/images/top_img_02.png"
                        alt="screenshot"
                        className="object-contain shadow-xl"
                        fill
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center w-full p-4 bg-white bg-opacity-10 backdrop-blur rounded-lg">
                <h3 className="text-left text-white font-extrabold w-full flex items-center lg:text-lg select-none border-b border-white border-opacity-30 pb-3">
                  <span className="material-icons mr-1">location_on</span>
                  近くの動物や迷子ペット情報の閲覧
                </h3>
                <p className="mt-4 px-2 text-sm w-full text-left text-white font-semibold text-opacity-90">
                  地図を使って、あなたの近くで見つかった動物や迷子ペットの情報を簡単に確認！迷子ペットを見つける手助けや、新たな動物との出会いを楽しめる体験が可能です。
                </p>
                <div className="mockup-phone m-0 scale-90 min-w-[352px] shadow-xl">
                  <div className="bg-[#000] z-20 rounded-full relative h-6 w-24 top-3 left-0 mx-auto"></div>
                  <div className="display">
                    <div className="h-[701px] w-full overflow-hidden relative">
                      <Image
                        src="/images/top_img_01.png"
                        alt="screenshot"
                        className="object-contain shadow-xl"
                        fill
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="w-full text-xs text-white text-right p-2">
              ※ 表示されている写真や情報はすべて開発中のイメージです。
            </p>
          </section>
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

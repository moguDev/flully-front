"use client";
import { useAuth } from "@/hooks/useAuth";
import defaultImage from "/public/images/default_avatar.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { removeParamsFromUrl } from "@/lib";

const closeDrawer = () => {
  const drawerCheckbox = document.getElementById(
    "drawer-menu"
  ) as HTMLInputElement;
  if (drawerCheckbox) drawerCheckbox.checked = false;
};

export const SideDrawer = ({ children }: { children: React.ReactNode }) => {
  const { authState, logout } = useAuth();
  const router = useRouter();
  const { showSuccess } = useToast();
  return (
    <div className="drawer drawer-end ">
      <input id="drawer-menu" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side z-50">
        <label
          htmlFor="drawer-menu"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <div className="bg-white font-bold h-full lg:w-96 w-80 shadow-lg px-5  py-10">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded relative">
              <Image
                src={removeParamsFromUrl(authState.avatarUrl) || defaultImage}
                alt="user_icon"
                className="object-cover rounded-full"
                fill
              />
            </div>
            <div className="ml-1.5">
              <p className="text-xl font-bold">{authState.nickname}</p>
              <p className="text-sm opacity-50">@{authState.name}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold">
              <span className="text-xs">LV</span>
              <span className="text-lg">{1}</span>
            </p>
            <p className="opacity-60 font-bold" style={{ fontSize: "8px" }}>
              次のレベルまで<span className="text-sm">{0}</span>EXP
            </p>
          </div>
          <div className="relative">
            <div className="w-full h-2 bg-gray-200 rounded-full" />
            <div className="absolute top-0 left-0 bg-main w-0 h-2 rounded-full" />
          </div>
          <div className="flex items-center space-x-2 py-1">
            <p className="text-lg">
              {authState.followersCount}
              <span className="ml-0.5" style={{ fontSize: "10px" }}>
                フォロワー
              </span>
            </p>
            <p className="text-lg">
              {authState.followingCount}
              <span className="ml-0.5" style={{ fontSize: "10px" }}>
                フォロー中
              </span>
            </p>
          </div>
          <ul className="my-2 py-2 space-y-1 border-t border-gray-200">
            <li>
              <button
                className="w-full flex items-center rounded py-2 transition-all active:scale-95"
                onClick={() => {
                  router.push(`/${name}`);
                  closeDrawer();
                }}
              >
                <span className="material-icons mr-1">person</span>
                <span className="text-sm">マイページ</span>
              </button>
            </li>
            <li>
              <button
                className="w-full flex items-center rounded py-2 transition-all active:scale-95"
                onClick={() => {
                  logout();
                  closeDrawer();
                  showSuccess("ログアウトしました");
                }}
              >
                <span className="material-icons mr-1">logout</span>
                <span className="text-sm">ログアウト</span>
              </button>
            </li>
          </ul>
          <ul className="my-2 py-2 space-y-1 border-t border-gray-200">
            <li>
              <button
                className="w-full flex items-center rounded py-2 transition-all active:scale-95"
                onClick={() => {
                  router.push("/map");
                  closeDrawer();
                }}
              >
                <span className="material-icons mr-1">home</span>
                <span className="text-sm">ホーム</span>
              </button>
            </li>
            <li>
              <button
                className="w-full flex items-center rounded py-2 transition-all active:scale-95"
                onClick={() => {
                  router.push("/boards");
                  closeDrawer();
                }}
              >
                <span className="material-icons mr-1">campaign</span>
                <span className="text-sm">迷子ペット情報</span>
              </button>
            </li>
            <li>
              <button
                className="w-full flex items-center rounded py-2 transition-all active:scale-95"
                onClick={() => {
                  router.push("/notifications");
                  closeDrawer();
                }}
              >
                <span className="material-icons mr-1">notifications</span>
                <span className="text-sm">通知</span>
              </button>
            </li>
          </ul>
          <ul className="my-2 py-2 space-y-1 border-t border-gray-200">
            <li>
              <button
                className="w-full flex items-center rounded py-2 transition-all active:scale-95"
                onClick={() => {
                  router.push("/terms");
                  closeDrawer();
                }}
              >
                <span className="material-icons mr-1">description</span>
                <span className="text-sm">ご利用規約</span>
              </button>
            </li>
            <li>
              <button
                className="w-full flex items-center rounded py-2 transition-all active:scale-95"
                onClick={() => {
                  router.push("/privacy");
                  closeDrawer();
                }}
              >
                <span className="material-icons mr-1">verified_user</span>
                <span className="text-sm">プライバシーポリシー</span>
              </button>
            </li>
            <li>
              <a
                href="mailto:contact@flully.jp?subject=お問い合わせ"
                className="w-full flex items-center rounded py-2 transition-all active:scale-95"
                onClick={() => {
                  closeDrawer();
                }}
              >
                <span className="material-icons mr-1">mail</span>
                <span className="text-sm">お問い合わせ</span>
              </a>
            </li>
          </ul>
          <p className="text-center font-bold text-xs">©️ flully 2024</p>
        </div>
      </div>
    </div>
  );
};

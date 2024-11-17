"use client";
import { useAuth } from "@/hooks/useAuth";
import { useWalking } from "@/hooks/useWalking";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { showModal } from "../map/components/FinishWalkingModal";
import { Toast } from "./Toast";
import { useToast } from "@/hooks/useToast";

export const Header = () => {
  const { isAuthenticated, checkAuth } = useAuth();
  const { inProgress, check } = useWalking();
  const { showAlert } = useToast();
  const router = useRouter();

  useEffect(() => {
    check();
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-40 shadow-lg ${inProgress ? "bg-orange-400" : "bg-main"}`}
    >
      <div className="flex items-center justify-between h-16 lg:px-5 px-3">
        {inProgress ? (
          <p className="text-xl font-bold text-base">さんぽ中...</p>
        ) : (
          <h1
            className="text-base font-black text-2xl cursor-pointer"
            onClick={() => router.push("/")}
          >
            flully
          </h1>
        )}
        {isAuthenticated ? (
          inProgress ? (
            <button
              className="bg-base text-orange-400 font-bold py-2 px-5 rounded transition-all active:scale-95"
              onClick={() => {
                showModal();
              }}
            >
              終了
            </button>
          ) : (
            <ul className="flex items-center text-base space-x-2">
              <li
                className="material-icons cursor-pointer"
                style={{ fontSize: "32px" }}
                onClick={() => showAlert("開発中の機能です")}
              >
                notifications
              </li>
              <li className="material-icons" style={{ fontSize: "32px" }}>
                <label htmlFor="drawer-menu" className="cursor-pointer">
                  menu
                </label>
              </li>
            </ul>
          )
        ) : (
          <Link
            href="/signin"
            className="flex items-center bg-base text-main px-3 py-2 rounded transition-all active:scale-95"
          >
            <span className="material-icons mr-0.5">login</span>
            <span className="font-bold">ログイン</span>
          </Link>
        )}
      </div>
      <Toast />
    </header>
  );
};

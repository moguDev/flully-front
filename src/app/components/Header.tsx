"use client";
import { useAuth } from "@/hooks/useAuth";
import { useWalking } from "@/hooks/useWalking";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { showModal } from "../map/components/FinishWalkingModal";

export const Header = () => {
  const pathName = usePathname();
  const { isAuthenticated, checkAuth } = useAuth();
  const { inProgress, check } = useWalking();

  useEffect(() => {
    check();
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-40 ${pathName === "/" && "hidden"} ${inProgress ? "bg-orange-400" : "bg-main"}`}
    >
      <div className="flex items-center justify-between h-16 px-3">
        {inProgress ? (
          <p className="text-xl font-bold text-base">さんぽ中...</p>
        ) : (
          <h1 className="text-base font-black text-2xl">flully</h1>
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
              <li className="material-icons" style={{ fontSize: "32px" }}>
                notifications
              </li>
              <li className="material-icons" style={{ fontSize: "32px" }}>
                <label htmlFor="drawer-menu">account_circle</label>
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
      {inProgress && (
        <div className="bg-orange-400 w-full h-8 flex items-center justify-between text-base font-bold px-3 border-t border-base">
          <p className="w-1/2">15分経過...</p>
          <p className="flex items-center">
            <span className="material-icons" style={{ fontSize: "20px" }}>
              directions_walk
            </span>
            0.2km
          </p>
        </div>
      )}
    </header>
  );
};

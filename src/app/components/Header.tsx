"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Toast } from "./Toast";
import { useToast } from "@/hooks/useToast";
import logo from "/public/images/flully_logo.png";
import Image from "next/image";

export const Header = () => {
  const { isAuthenticated, checkAuth } = useAuth();
  const { showAlert } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-40 bg-main ${pathname === "/" ? "bg-opacity-0" : "bg-opacity-90 backdrop-blur"}`}
    >
      <div className="flex items-center justify-between h-16 lg:px-5 px-3">
        <div
          className="h-12 w-20 cursor-pointer relative select-none"
          onClick={() => {
            if (isAuthenticated) {
              router.push("/map");
            } else {
              router.push("/");
            }
          }}
        >
          <Image src={logo} alt="logo" className="object-contain" fill />
        </div>
        {isAuthenticated ? (
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
        ) : (
          <Link
            href="/signin"
            className="flex items-center border border-white border-opacity-80 text-white px-3 py-2 rounded transition-all active:scale-95"
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

"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const Header = () => {
  const pathName = usePathname();
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <header
      className={`fixed top-0 h-16 w-full bg-main z-50 ${pathName === "/" && "hidden"}`}
    >
      <div className="flex items-center justify-between h-full px-3">
        <h1 className="text-base font-black text-2xl">flully</h1>
        {isAuthenticated ? (
          <ul className="flex items-center text-base space-x-2">
            <li className="material-icons" style={{ fontSize: "32px" }}>
              notifications
            </li>
            <li className="material-icons" style={{ fontSize: "32px" }}>
              <label htmlFor="drawer-menu">account_circle</label>
            </li>
          </ul>
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
    </header>
  );
};

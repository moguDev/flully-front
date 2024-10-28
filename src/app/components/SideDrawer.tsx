"use client";

import { useAuth } from "@/hooks/useAuth";

export const SideDrawer = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuth();
  return (
    <div className="drawer drawer-end">
      <input id="drawer-menu" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label
          htmlFor="drawer-menu"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <ul className="p-3 bg-base font-bold h-96 w-72 rounded mt-[72px] m-2 divide-y divide-gray-200">
          <li>
            <a>
              <span className="material-icons">person</span>マイページ
            </a>
          </li>
          <li>
            <button
              className="w-full bg-red-500 text-base flex items-center justify-center rounded py-2 transition-all active:scale-95"
              onClick={() => {
                logout();
              }}
            >
              <span className="material-icons">logout</span>
              <span className="text-sm">ログアウト</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

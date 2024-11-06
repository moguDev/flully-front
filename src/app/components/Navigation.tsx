"use client";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface NavigationMenuProps {
  iconName: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

const NavigationMenu = ({
  iconName,
  label,
  selected,
  onClick,
}: NavigationMenuProps) => {
  return (
    <li
      className={`mx-4 my-2 p-1 w-1/4 flex flex-col items-center justify-center transition-all rounded ${selected ? "opacity-100 scale-110 bg-main bg-opacity-30" : "opacity-50"}`}
      onClick={onClick}
    >
      <p className="material-icons select-none" style={{ fontSize: "28px" }}>
        {selected ? iconName : iconName}
      </p>
      <p className="select-none" style={{ fontSize: "8px" }}>
        {label}
      </p>
    </li>
  );
};

export const Navigation = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [selectIndex, setSelectIndex] = useState<number>(0);
  const { isAuthenticated, name } = useAuth();
  return (
    <ul
      className={`fixed bottom-0 flex items-center h-16 w-full border-t bg-base border-gray-300 z-40 ${pathName === "/" && "hidden"}`}
    >
      <NavigationMenu
        iconName="location_on"
        label="マップ"
        selected={selectIndex === 0}
        onClick={() => {
          setSelectIndex(0);
          router.push("/map");
        }}
      />
      <NavigationMenu
        iconName="format_list_bulleted"
        label="まいご掲示板"
        selected={selectIndex === 1}
        onClick={() => {
          setSelectIndex(1);
          router.push("/threads");
        }}
      />
      <NavigationMenu
        iconName="leaderboard"
        label="ランキング"
        selected={selectIndex === 2}
        onClick={() => {
          setSelectIndex(2);
          // router.push("/ranking");
        }}
      />
      <NavigationMenu
        iconName="person"
        label="マイページ"
        selected={selectIndex === 3}
        onClick={() => {
          setSelectIndex(3);
          if (isAuthenticated) {
            router.push(`/${name}`);
          } else {
            router.push("/signin");
          }
        }}
      />
    </ul>
  );
};

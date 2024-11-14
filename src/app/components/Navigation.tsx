"use client";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";

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
      className={`mx-4 my-2 p-1 w-full flex flex-col items-center justify-center transition-all rounded ${selected ? "opacity-100 scale-125 bg-main bg-opacity-30" : "opacity-50"} cursor-pointer hover:scale-125`}
      onClick={onClick}
    >
      <p className="material-icons select-none" style={{ fontSize: "24px" }}>
        {selected ? iconName : iconName}
      </p>
      <p
        className="lg:hidden select-none font-bold"
        style={{ fontSize: "7px" }}
      >
        {label}
      </p>
    </li>
  );
};

export const Navigation = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { isAuthenticated, name } = useAuth();
  return (
    <ul
      className={`shadow-lg fixed lg:pt-20 lg:top-0 lg:h-full lg:w-16 lg:flex-col bottom-0 flex items-center h-16 w-full border-t bg-base border-gray-300 z-30 overflow-hidden ${pathName === "/" && "hidden"}`}
    >
      <NavigationMenu
        iconName="location_on"
        label="マップ"
        selected={pathName.includes("/map")}
        onClick={() => router.push("/map")}
      />
      <NavigationMenu
        iconName="format_list_bulleted"
        label="まいご掲示板"
        selected={pathName.includes("/boards")}
        onClick={() => router.push("/boards")}
      />
      {/* <NavigationMenu
        iconName="leaderboard"
        label="リーダーボード"
        selected={selectIndex === 2}
        onClick={() => {
          setSelectIndex(2);
          // router.push("/ranking");
        }}
      /> */}
      <NavigationMenu
        iconName="person"
        label="マイページ"
        selected={name !== "" && pathName.includes(`/${name}`)}
        onClick={() => {
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

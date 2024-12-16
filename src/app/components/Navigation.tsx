"use client";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { usePathname, useRouter } from "next/navigation";

interface NavigationMenuProps {
  iconName: string;
  selected: boolean;
  onClick: () => void;
  badge?: number;
}

const NavigationMenu = ({
  iconName,
  selected,
  onClick,
  badge,
}: NavigationMenuProps) => {
  return (
    <li
      className={`relative my-2 w-full flex flex-col items-center justify-center rounded cursor-pointer`}
      onClick={onClick}
    >
      {badge && badge > 0 ? (
        <div className="absolute flex items-center justify-center top-[5px] lg:right-[13.5px] right-[30px] rounded-full h-4 w-4 bg-red-400 border border-base z-10">
          <p className="text-white font-bold" style={{ fontSize: "9px" }}>
            {badge}
          </p>
        </div>
      ) : (
        <></>
      )}
      <p
        className={`material-icons select-none lg:px-2 px-6 p-2 rounded-xl transition-all ${selected ? "opacity-100 scale-110" : "opacity-30"} `}
        style={{ fontSize: "28px" }}
      >
        {selected ? iconName : iconName}
      </p>
    </li>
  );
};

export const Navigation = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { authState } = useAuth();
  const { isAuthenticated, name } = authState;
  const { unread } = useNotifications();
  return (
    <ul
      className={`shadow-lg fixed lg:pt-20 lg:top-0 lg:h-full lg:w-16 lg:flex-col bottom-0 flex items-center h-16 w-full border-t bg-base border-gray-300 z-30 overflow-hidden ${pathName === "/" && "hidden"}`}
    >
      <NavigationMenu
        iconName="home"
        selected={pathName.includes("/map")}
        onClick={() => router.push("/map")}
      />
      <NavigationMenu
        iconName="campaign"
        selected={pathName.includes("/boards")}
        onClick={() => router.push("/boards")}
      />
      <NavigationMenu
        iconName="notifications"
        selected={pathName.includes("/notifications")}
        onClick={() => router.push("/notifications")}
        badge={unread}
      />
      <NavigationMenu
        iconName="person"
        selected={name !== "" && pathName.includes(`/${name}`)}
        onClick={() => {
          if (isAuthenticated) {
            router.push(`/${name}`);
          } else {
            router.replace("/signin");
          }
        }}
      />
    </ul>
  );
};

"use client";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";

const NavigationMenu = ({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <li
      className={`font-bold flex items-center p-5 cursor-pointer transition-all ${selected ? "opacity-100 bg-main bg-opacity-20" : "opacity-50"}`}
      onClick={onClick}
    >
      <span className="material-icons px-1">{icon}</span>
      {label}
    </li>
  );
};

export const SideNavigation = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { name } = useAuth();
  return (
    <div className="fixed top-0 left-0 w-72 h-screen shadow-xl bg-base">
      <ul className="pt-20">
        <NavigationMenu
          icon="location_on"
          label="マップ"
          selected={pathName.includes("/map")}
          onClick={() => router.push("/map")}
        />
        <NavigationMenu
          icon="format_list_bulleted"
          label="まいご掲示板"
          selected={pathName.includes("/boards")}
          onClick={() => router.push("/boards")}
        />
        <NavigationMenu
          icon="person"
          label="プロフィール"
          selected={name !== "" && pathName.includes(`/${name}`)}
          onClick={() => router.push(`/${name}`)}
        />
      </ul>
    </div>
  );
};

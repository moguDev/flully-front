"use client";

import { usePathname } from "next/navigation";

export const Header = () => {
  const pathName = usePathname();
  return (
    <header
      className={`fixed top-0 h-16 w-full bg-main ${pathName === "/" && "hidden"}`}
    >
      <div className="flex items-center p-5">
        <h1 className="text-base font-black text-2xl">flully</h1>
      </div>
    </header>
  );
};

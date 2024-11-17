"use client";

import { usePathname } from "next/navigation";

export const BaseWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  return (
    <div className={`${pathName !== "/" && "lg:pl-16"} lb:pb-0 w-full`}>
      {children}
    </div>
  );
};

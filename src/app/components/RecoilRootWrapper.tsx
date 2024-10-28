"use client";
import { RecoilRoot } from "recoil";

export const RecoilRootWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

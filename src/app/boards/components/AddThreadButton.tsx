"use client";

import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

export const AddThreadButton = () => {
  const router = useRouter();
  const { authState } = useAuth();
  const { isAuthenticated } = authState;
  const { requireSignin } = useToast();
  return (
    <div className="fixed w-full lg:bottom-5 bottom-16 right-0 left-0">
      <div className="max-w-5xl mx-auto flex items-center justify-end">
        <button
          className="p-4 m-2 bg-main lg:rounded-xl rounded-full text-white transition-all active:scale-95 z-20"
          onClick={() => {
            if (isAuthenticated) {
              router.push("/boards/new");
            } else {
              requireSignin();
            }
          }}
        >
          <p className="flex items-center font-bold">
            <span className="material-icons" style={{ fontSize: "36px" }}>
              campaign
            </span>
            <span className="lg:block hidden ml-1">掲示板を作成</span>
          </p>
        </button>
      </div>
    </div>
  );
};

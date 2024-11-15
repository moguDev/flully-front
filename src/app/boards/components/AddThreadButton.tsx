"use client";

import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

export const AddThreadButton = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { requireSignin } = useToast();
  return (
    <button
      className="fixed bottom-16 right-0 m-2 p-3 flex items-center bg-main rounded-lg text-white transition-all active:scale-95"
      onClick={() => {
        if (isAuthenticated) {
          router.push("/boards/new");
        } else {
          requireSignin();
        }
      }}
    >
      <span className="material-icons">add</span>
      <p className="font-bold text-sm">掲示板を作成</p>
    </button>
  );
};

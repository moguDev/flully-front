"use client";

import { toastMessageState, ToastState } from "@/hooks/useToast";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const Toast = () => {
  const [toast, setToast] = useRecoilState<ToastState>(toastMessageState);

  useEffect(() => {
    if (toast.message !== "") {
      const timer = setTimeout(() => {
        setToast({ message: "", toastType: "success" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast.message, setToast]);

  return (
    <div
      className={`w-full fixed flex items-center justify-center top-0 transition-all ${
        toast.message === ""
          ? "-translate-y-20 opacity-0"
          : "translate-y-20 opacity-100"
      }`}
    >
      <div
        className={`px-3 py-2 rounded-full bg-opacity-80 backdrop-blur-lg ${toast.toastType === "success" ? "bg-blue-600" : "bg-red-400"}`}
      >
        <p className="text-white font-bold text-sm">{toast.message}</p>
      </div>
    </div>
  );
};

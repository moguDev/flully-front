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
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toast.message, setToast]);

  return (
    <div
      className={`w-full fixed flex items-center justify-center top-0 transition-all ${
        toast.message === ""
          ? "-translate-y-20 opacity-0 -z-10"
          : "translate-y-20 opacity-100"
      }`}
    >
      <div
        className={`flex items-center px-3 py-2 rounded-md bg-opacity-90 backdrop-blur ${toast.toastType === "success" ? "bg-blue-400" : "bg-red-400"}`}
      >
        <p className="text-white font-bold text-sm">{toast.message}</p>
        <p
          className="material-icons text-white p-2 cursor-pointer"
          style={{ fontSize: "16px" }}
          onClick={() => setToast({ message: "", toastType: "success" })}
        >
          close
        </p>
      </div>
    </div>
  );
};

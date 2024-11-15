import { atom, useSetRecoilState } from "recoil";

export type ToastState = {
  message: string;
  toastType: "success" | "alert" | "danger";
};

export const toastMessageState = atom<ToastState>({
  key: "toastMessageState",
  default: { message: "", toastType: "success" },
});

export const useToast = () => {
  const setToast = useSetRecoilState(toastMessageState);
  const showSuccess = (message: string) => {
    setToast({ message: message, toastType: "success" });
  };
  const showAlert = (message: string) => {
    setToast({ message: message, toastType: "alert" });
  };
  const requireSignin = () => {
    setToast({ message: "ログインしてください", toastType: "alert" });
  };
  return { showSuccess, showAlert, requireSignin };
};

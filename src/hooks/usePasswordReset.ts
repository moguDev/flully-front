import { api } from "@/lib/axiosInstance";
import { useToast } from "./useToast";
import { useState } from "react";

export const usePasswordReset = () => {
  const { showSuccess, showAlert } = useToast();
  const [isSend, setIsSend] = useState<boolean>(false);
  const requestPasswordReset = async (email: string) => {
    try {
      await api.post("/auth/password", {
        email,
        redirect_url: "http://localhost:3000/reset-password",
      });
      showSuccess("パスワードリセットメールが送信されました");
      setIsSend(true);
    } catch (error) {
      console.error("エラー:", error);
      showAlert(
        "リンクの送信に失敗しました。入力されたメールアドレスを確認してください。"
      );
    }
  };
  return { isSend, requestPasswordReset };
};
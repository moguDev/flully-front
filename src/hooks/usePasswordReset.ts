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
        redirect_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password/edit`,
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

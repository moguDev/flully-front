import { api } from "@/lib/axiosInstance";
import { useToast } from "./useToast";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const usePasswordReset = () => {
  const { showSuccess, showAlert } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const token: string = searchParams.get("token") || "";

  const getHeaderParams = (): {
    uid: string;
    client: string;
    "access-token": string;
  } => {
    const uid: string = searchParams.get("uid") || "";
    const client: string = searchParams.get("client") || "";
    const accessToken: string = searchParams.get("access-token") || "";
    return { uid, client, "access-token": accessToken };
  };

  const requestPasswordReset = async (email: string) => {
    setLoading(true);
    try {
      await api.post("/auth/password", {
        email,
        redirect_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset_password/edit`,
      });
      showSuccess("パスワードリセットメールが送信されました");
      setIsSend(true);
    } catch (error) {
      console.error("エラー:", error);
      showAlert(
        "リンクの送信に失敗しました。入力されたメールアドレスを確認してください。"
      );
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (
    password: string,
    passwordConfirmation: string
  ) => {
    setLoading(true);
    try {
      await api.put(
        "/auth/password",
        {
          reset_password_token: decodeURIComponent(token as string),
          password,
          password_confirmation: passwordConfirmation,
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...getHeaderParams(),
          },
        }
      );
      showSuccess("パスワードがリセットされました。");
      setIsSend(true);
      setTimeout(() => router.push("/signin"), 3000);
    } catch (e) {
      console.error(e);
      showAlert("パスワードのリセットに失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return { loading, isSend, requestPasswordReset, updatePassword };
};

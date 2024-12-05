"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";

const AuthCallbackPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const accessToken = params.get("access-token");
  const client = params.get("client");
  const uid = params.get("uid");
  const { checkAuth } = useAuth();
  const { showAlert, showSuccess } = useToast();

  const signin = async () => {
    try {
      if (accessToken && client && uid) {
        Cookies.set("access-token", accessToken);
        Cookies.set("client", client);
        Cookies.set("uid", uid);

        await checkAuth();
        router.push("/map");
        showSuccess("ログインしました");
      } else {
        console.error("トークン情報が不足しています");
      }
    } catch (e) {
      console.error(e);
      showAlert("ログインに失敗しました");
    }
  };

  useEffect(() => {
    signin();
  }, [params]);

  return <p>Google 認証中...</p>;
};

export default AuthCallbackPage;

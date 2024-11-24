import axios from "axios";
import { getSession } from "next-auth/react";

export async function authenticateWithRails() {
  const session = await getSession();
  if (!session) throw new Error("ログインセッションがありません");

  try {
    const response = await axios.post("/api/v1/auth/google", {
      access_token: session.accessToken,
    });
    console.log("Railsログイン成功:", response.data);
  } catch (error) {
    console.error("Railsログインエラー:", error);
  }
}

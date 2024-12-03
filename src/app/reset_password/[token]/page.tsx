"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axiosInstance";

const getAuthHeaders = () => {
  return {
    "Content-Type": "application/json",
    "access-token": localStorage.getItem("access-token") ?? "",
    client: localStorage.getItem("client") ?? "",
    uid: localStorage.getItem("uid") ?? "",
  };
};

export default function ResetPasswordForm({
  params,
}: {
  params: { token: string };
}) {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(
        "/auth/password",
        {
          body: {
            reset_password_token: params.token,
            password,
            password_confirmation: passwordConfirmation,
          },
        },
        { headers: { ...getAuthHeaders() } }
      );
      setMessage("Password has been successfully reset.");
      setTimeout(() => router.push("/login"), 3000);
    } catch (e) {
      console.error(e);
      setMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <main className="max-w-xl mx-auto py-24">
      <div className="bg-white p-4">
        <h1 className="font-bold flex items-center text-xl">
          パスワードをリセット
        </h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="password"
              placeholder="新しいパスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm new password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-main p-3 rounded text-white font-bold"
          >
            パスワードを再設定
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </main>
  );
}

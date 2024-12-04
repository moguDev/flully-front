"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/axiosInstance";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const uid = searchParams.get("uid");
  const client = searchParams.get("client");
  const accessToken = searchParams.get("access-token");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    console.log(token);
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
            uid,
            client,
            "access-token": accessToken,
          },
        }
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
      <div className="bg-white lg:rounded-lg lg:px-10 px-5 py-10 shadow-sm">
        <h1 className="font-black flex items-center text-2xl">
          パスワードをリセット
        </h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="my-2">
            <input
              type="password"
              placeholder="新しいパスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 border-b border-gray-300 outline-none"
            />
          </div>
          <div className="my-2">
            <input
              type="password"
              placeholder="Confirm new password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full py-2 border-b border-gray-300 outline-none"
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

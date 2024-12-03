"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axiosInstance";

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
      await api.put("/auth/password", {
        reset_password_token: params.token,
        password,
        password_confirmation: passwordConfirmation,
      });
      setMessage("Password has been successfully reset.");
      setTimeout(() => router.push("/login"), 3000);
    } catch (e) {
      console.error(e);
      setMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <div>
      <h1>Set New Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

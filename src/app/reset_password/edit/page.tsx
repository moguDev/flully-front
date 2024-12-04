"use client";
import { useState } from "react";
import { usePasswordReset } from "@/hooks/usePasswordReset";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { isSend, loading, updatePassword } = usePasswordReset();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updatePassword(password, passwordConfirmation);
  };

  return (
    <main className="max-w-xl mx-auto py-24">
      <div className="relative bg-white lg:rounded-lg lg:px-10 px-5 py-10 shadow-sm">
        {loading && (
          <div className="absolute top-0 left-0 bg-white opacity-50 h-full w-full flex items-center justify-center">
            <span className="loading loading-spinner loading-md" />
          </div>
        )}
        <h1 className="mb-4 font-black flex items-center text-2xl">
          パスワードを再設定
        </h1>
        {isSend ? (
          <div className="flex flex-col items-center justify-center text-main font-bold">
            <p className="flex items-center justify-center min-h-24">
              <span className="material-icons">check_circle</span>
              パスワードを再設定しました。
            </p>
            <p>3秒後にログインページに遷移します。</p>
          </div>
        ) : (
          <>
            <p className="text-xs my-2 p-3 font-semibold text-gray-500 bg-gray-50 rounded-lg">
              パスワードを再設定します。新しいパスワードを入力してください。
            </p>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <div className="my-2">
                <label
                  htmlFor="password"
                  className="font-bold text-xs text-main"
                >
                  パスワード
                </label>
                <div className="border-b border-gray-300 flex items-center py-1">
                  <span className="material-icons text-main mr-1">key</span>
                  <input
                    type="password"
                    placeholder="半角英数字8文字以上"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full outline-none"
                  />
                </div>
              </div>
              <div className="my-2">
                <label
                  htmlFor="password-confirmation"
                  className="font-bold text-xs text-main"
                >
                  パスワード（確認用）
                </label>
                <div className="border-b border-gray-300 flex items-center py-1">
                  <span className="material-icons text-main mr-1">key</span>
                  <input
                    type="password"
                    placeholder="半角英数字8文字以上"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className="w-full outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-main p-3 rounded text-white font-bold"
              >
                パスワードを再設定
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}

"use client";

import { usePasswordReset } from "@/hooks/usePasswordReset";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
};

export default function PasswordResetPage() {
  const { isSend, requestPasswordReset } = usePasswordReset();

  const defaultValues = { email: "" };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onsubmit = (data: FormData) => {
    requestPasswordReset(data.email);
  };
  return (
    <main className="max-w-xl mx-auto py-24">
      <div className="bg-white p-4">
        <h1 className="font-bold flex items-center text-xl">
          パスワードをリセット
        </h1>
        {isSend ? (
          <p className="flex items-center justify-center min-h-24 text-main font-bold">
            <span className="material-icons">check_circle</span>
            メールを送信しました
          </p>
        ) : (
          <>
            <p className="text-sm py-4 text-gray-600">
              パスワードリセット用のリンクをお送りいたします。ご登録済みのメールアドレスを入力してください。
            </p>
            <form
              className="flex flex-col space-y-4"
              onSubmit={handleSubmit(onsubmit)}
            >
              <div>
                <div className="flex items-center border-b border-gray-300 py-2">
                  <span className="material-icons text-main mr-1">email</span>
                  <input
                    type="email"
                    placeholder="メールアドレスを入力"
                    className="w-full bg-white outline-none"
                    {...register("email", {
                      required: "メールアドレスが入力されていません",
                      pattern: {
                        value:
                          /^[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i,
                        message: "メールアドレスの形式が不正です。",
                      },
                    })}
                  />
                </div>
                <div className="text-red-500 font-bold text-xs p-1">
                  {errors.email?.message}
                </div>
              </div>
              <button
                type="submit"
                className="bg-main p-3 rounded text-white font-bold"
              >
                リセットリンクを送信
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
